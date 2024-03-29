import React, { Suspense } from "react";
import { Howl, Howler } from 'howler';
import { TrackInfo, Controls, Progress, Volume } from "./components";
import { IconWrapper } from "../Icon/IconWrapper";
import { playerStyles } from './styles';
import { formatTime, lazy } from '../../utils/helpers';
import styled from "styled-components";
import { buttonStyles, playerStyles as playerThemes } from "./styles/themes";
import { PlayerProps, TPlayerState } from "./types";
import VideoPlayer from "./VideoPlayer";
import {shuffle} from "../../utils/array";
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
  public videoPlayerRef: React.RefObject<HTMLVideoElement>;
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
        showSlider: false,
        shuffle: false,
        repeat: "off"
      }
    };
    this.play = this.play.bind(this);
    this.onTrackChange = this.onTrackChange.bind(this);
    this.createAudioTrack = this.createAudioTrack.bind(this);
    this.skip = this.skip.bind(this);
    this.stop = this.stop.bind(this);
    this.onClosePlaylist = this.onClosePlaylist.bind(this);
    this.togglePlaylist = this.togglePlaylist.bind(this);
    this.toggleShuffle = this.toggleShuffle.bind(this);
    this.onRepeat = this.onRepeat.bind(this);
    this.videoPlayerRef = React.createRef();
  }

  componentWillUnmount(): void {
    Howler.stop();
  }

  getReorderedTracks(values: { moved: number, target: number }) {
    const movedTrackIndex = +this.state.tracks.findIndex(track => track.id === values.moved);
    const targetTrackIndex = +this.state.tracks.findIndex(track => track.id === values.target);
    const activeTrack = this.state.tracks[movedTrackIndex];
    const reorderedTracks = [...this.state.tracks];
    reorderedTracks.splice(movedTrackIndex, 1);
    reorderedTracks.splice(targetTrackIndex, 0, activeTrack);
    this.setState(state => ({
      ...state,
      tracks: [...reorderedTracks],
    }));
  };

  skip(direction: string) {
    let index;
    const { track, tracks } = this.state;
    const trackIndex = tracks.findIndex(item => item.id === track.source.id);
    index = direction === "next" ? (trackIndex + 1 > tracks.length - 1 ?
      0 : trackIndex + 1) : (trackIndex - 1 < 0 ? tracks.length - 1 : trackIndex - 1);
    const howl = getPlayingTrack(tracks);
    /**
    * Skip to the next or previous track.
    * @param  {String} direction 'next' or 'prev'.
    */
    // Get the next track based on the direction of the track.
    if (howl) howl.howl.stop();
    const clearedTracks = resetHowls(tracks);
    const newTrack = this.createAudioTrack(clearedTracks[index]);
    newTrack.play();
    if (this.videoPlayerRef) this.videoPlayerRef.current?.play();
    const updTracks = updatedTracks(clearedTracks, index, newTrack);
    this.setState((state: TPlayerState) => ({
      ...state,
      tracks: [
        ...updTracks
      ],
      track: {
        ...state.track,
        time: 0,
        play: true,
        percent: 0,
        index,
        source: {
          ...updTracks[index],
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
        if (self.state.settings.repeat === "once") { self.play(true, self.state.track.source.id); }
        else if (self.state.track.source.id === self.state.tracks.length && self.state.settings.repeat === "off") { self.stop(); }
        else if (self.state.settings.shuffle) self.play(true, shuffle(self.state.tracks)[0].id);
        else self.skip('next');
      },
      onseek: function () {
        if (self.videoPlayerRef.current) {
          self.videoPlayerRef.current.currentTime = this._sounds[0]._seek;
        }
      }
    });
    return howl;
  }

  play(value, id) {
    let tracksArr = this.state.tracks;
    const { track, tracks } = this.state;
    if (this.videoPlayerRef.current!) this.videoPlayerRef?.current.play();
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
        duration: formatTime(Math.round(sound.howl?.duration()))
      }
    }));
  }

  pause(value: boolean, id: number) {
    // Get the sound we want to manipulate.
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
    if (this.videoPlayerRef.current!) this.videoPlayerRef?.current.pause();
  }
  onTrackChange(value, id) {
    if (value) this.play(value, id || null);
    else this.pause(value, id || null);
  };
  togglePlaylist() {
    this.setState((state: TPlayerState) => ({ ...state, playlist: !state.playlist }));
  };

  onClosePlaylist(value) {
    this.setState(state => ({ ...state, playlist: value }));
  };

  toggleShuffle() {
    this.setState((state: TPlayerState) => ({ ...state, settings: { ...state.settings, shuffle: !state.settings.shuffle } }));
  }
  onRepeat(value) {
    this.setState(state => ({ ...state, settings: { ...state.settings, repeat: value } }))
  }
  render() {
    const position = this.props.position || "fixed";
    const { theme } = this.props;
    const { tracks, track, settings, playlist } = this.state;
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
              <PlayerSC data-testid="player" theme={theme} className="player">
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
                      onPause={this.onTrackChange}
                      videoPlayer={<VideoPlayer ref={this.videoPlayerRef} sound={track.source.howl} url={track?.source?.video} theme={theme} />}
                      onShuffle={this.toggleShuffle}
                      onRepeat={this.onRepeat} />
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
                    onReorder={this.getReorderedTracks.bind(this)}
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