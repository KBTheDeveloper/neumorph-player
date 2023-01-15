import React, { Suspense } from "react";
import { Howl, Howler } from 'howler';
import { TrackInfo, Controls, Progress, Volume } from "./components";
import { IconWrapper } from "../Icon/IconWrapper";
import { playerStyles } from './styles';
import { formatTime, lazy } from '../../utils/helpers';
import styled from "styled-components";
import { buttonStyles, playerStyles as playerThemes } from "./styles/themes";
import { PlayerProps, TPlayerState } from "./types";
const Playlist = lazy(() => import("./Playlist"));
const PlayerWrapperSC = styled.div(props => ({
  position: props.position,
  ...playerStyles
}));
const PlayerSC = styled.div(props => ({
  ...playerThemes[props.theme]
}));
const getTrackById = (tracks, id) => tracks.find(track => track.id === id);
const getTrackIndex = (tracks, id) => tracks.findIndex(track => track.id === id);
const getPlayingTrack = (tracks) => tracks.find(track => track?.howl);
const resetHowls = (tracks) => {
  return tracks.map(track => {
    track.howl = null;
    return track;
  });
};

const updatedTracks = (array, index, howl) => {
  const updatedTracks = [...array];
  updatedTracks[index].howl = howl;
  return updatedTracks;
};

export default class Player extends React.Component<PlayerProps, TPlayerState> {
  constructor(props) {
    super(props);
    this.state = {
      track: {
        playTime: "0:00",
        index: 0,
        percent: 0,
        loading: false,
        duration: "0:00",
        play: false,
        source: this.props.tracks[0]
      },
      tracks: this.props.tracks,
      playlist: false,
      settings: {
        volume: +JSON.parse(window.localStorage.getItem("player_settings"))?.settings?.volume / 100 || 0.5,
        muted: false,
        showSlider: false
      }
    };
    this.play = this.play.bind(this);
    this.onTrackChange = this.onTrackChange.bind(this);
    this.createAudioTrack = this.createAudioTrack.bind(this);
    this.skip = this.skip.bind(this);
    this.stop = this.stop.bind(this);
    this.onClosePlaylist = this.onClosePlaylist.bind(this);
    this.togglePlaylist = this.togglePlaylist.bind(this);
  }

  componentWillUnmount(): void {
    Howler.stop();
  }

  getReorderedTracks(array, active) {
    const activeIndex = +array.findIndex(track => track.id === +active);
    const index = activeIndex === -1 ? 0 : activeIndex;
    const activeTrack = array[activeIndex];
    this.setState(state => ({
      ...state,
      tracks: [...array],
      track: {
        ...state.track,
        index: index,
        source: activeTrack
      }
    }));
  };

  skip(direction: string) {
    const {track, tracks} = this.state;
    const index = direction === "next" ? (track.index + 1 > tracks.length - 1 ?
      0 : track.index + 1) : (track.index - 1 < 0 ? tracks.length - 1 : track.index - 1);
    /**
    * Skip to the next or previous track.
    * @param  {String} direction 'next' or 'prev'.
    */
    // Get the next track based on the direction of the track.
    if (track.source.howl) track.source.howl.stop();
    const clearedTracks = resetHowls(tracks);
    const newTrack = this.createAudioTrack(clearedTracks[index]);
    newTrack.play();
    this.setState((state: TPlayerState) => ({
      ...state,
      tracks: [
        ...updatedTracks(clearedTracks, index, newTrack)
      ],
      track: {
        ...state.track,
        time: 0,
        play: true,
        percent: 0,
        index,
        source: {
          ...clearedTracks[index],
          howl: newTrack
        }
      }
    }));
  };

  stop() {
    const { howl } = getPlayingTrack(this.state.tracks);
    howl.stop();
    this.setState(state => ({
      ...state,
      track: {
        ...state.track,
        playTime: "0:00",
        source: {
          ...state.track.source,
          howl: null,
        },
        play: false
      }
    }));
  }

  createAudioTrack(track) {
    const self = this;
    const howl = new Howl({
      src: [`/src/assets/audio/${track.filename}`],
      html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
      onload: function () {
        self.setState((state: TPlayerState) => ({
          ...state,
          track: {
            ...state.track,
            source: track,
            // loading: sound.howl?.state() === 'loaded' ? false : true,
            duration: formatTime(Math.round(state.track.source.howl?.duration()))
          }
        }));
      },
      onend: function () {
        if (self.state.track.source.id < self.state.tracks.length) self.skip('next');
        else self.stop();
      }
    });
    return howl;
  }
  
  play(value, id) {
    let tracksArr = this.state.tracks;
    const {track, tracks} = this.state;
    const playingTrack = getPlayingTrack(tracks);
    if (playingTrack?.id !== id) {
      playingTrack?.howl?.stop();
      tracksArr = resetHowls(tracks);
    };
    const sound = id ? getTrackById(tracksArr, id) : track.source;
    if (!sound?.howl) {
      sound.howl = this.createAudioTrack(sound);
    }
    const index = id ? getTrackIndex(tracksArr, id) : track.index;
    tracksArr = updatedTracks(tracksArr, index, sound.howl);
    sound.howl.play();
    this.setState((state: TPlayerState) => ({
      ...state,
      tracks: [...tracksArr],
      track: {
        ...state.track,
        play: value,
        // loading: sound.howl?.state() === 'loaded' ? false : true,
        source: sound,
        duration: formatTime(Math.round(sound.howl.duration()))
      }
    }));
    // Begin playing the sound.

    // Show the pause button.
  }
  /**
* Pause the currently playing track.
*/
  pause(value: boolean, id: number) {
    // Get the Howl we want to manipulate.
    const { howl } = id ? getTrackById(this.state.tracks, id) : this.state.track.source;
    // Pause the sound.
    this.setState((state: TPlayerState) => ({
      ...state,
      track: {
        ...state.track,
        play: value,
      }
    }));
    howl.pause();
  }
  onTrackChange(value, id) {
    if (value) this.play(value, id || null);
    else this.pause(value, id || null);
  };
  togglePlaylist() {
    this.setState((state: TPlayerState)  => ({ ...state, playlist: !state.playlist }));
  };

  onClosePlaylist(value) {
    this.setState(state => ({ ...state, playlist: value }));
  };

  render() {
    const position = this.props.position || "fixed";
    const { theme } = this.props;
    const {tracks, track, settings, playlist} = this.state;
    const playback = track.play ? "play" : "pause";
    const defaultButtonStyle = {
      boxShadow: buttonStyles[theme].boxShadow,
      ...buttonStyles[theme].defaultButton
    };
    return (
      <PlayerWrapperSC position={position} className="playerWrapper">
        <div className="container">
          <div className="grid">
            <div className="grid__col-12 mb-0">
              <PlayerSC theme={theme} className="player">
                <TrackInfo
                  title={track.source.title}
                  cover={track.source.cover}
                  artist={track.source.artist}
                  track={track.source.howl}
                  duration={track.duration}
                />
                <div className="controlsOuter px-6 px-xs-4">
                  <div className="controlsInner d-flex align-items--center">
                    <IconWrapper
                      title="Playlist"
                      role="button"
                      tabIndex="0"
                      noAlign={true}
                      styles={defaultButtonStyle}
                      classes="mr-5"
                      iconName="playlist"
                      onKeyPress={this.togglePlaylist}
                      onClick={this.togglePlaylist} />
                    <Controls
                      theme={theme}
                      loading={track.loading}
                      currentTrackIndex={track.index}
                      items={tracks}
                      onSkip={this.skip}
                      onPlay={this.onTrackChange}
                      playback={playback}
                      onPause={this.onTrackChange} />
                    <Volume
                      level={settings.volume}
                      theme={theme}
                      muted={settings.muted}
                      slider={{
                        value: settings.volume,
                        start: 50,
                      }}
                    />
                  </div>
                </div>
                <Progress
                  theme={this.props.theme}
                  percent={track.percent}
                  track={track} />
                <Suspense fallback="loading">
                  <Playlist
                    show={playlist}
                    theme={theme}
                    playback={this.onTrackChange}
                    onReorder={this.getReorderedTracks}
                    onPlay={this.onTrackChange}
                    onPause={this.onTrackChange}
                    currentTrack={track}
                    items={tracks}
                    onClose={this.onClosePlaylist} />
                </Suspense>
              </PlayerSC>
            </div>
          </div>
        </div>
      </PlayerWrapperSC>
    );
  }
}