import React, { Suspense, useEffect, useState } from "react";
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
const defaultSettings = {
  volume: +JSON.parse(window.localStorage.getItem("player_settings"))?.settings?.volume / 100 || 0.5,
  muted: false,
  showSlider: false
}

const destroy = () => {
  Howler.stop();
}
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

const Player: React.FunctionComponent<PlayerProps> = React.memo((props: PlayerProps) => {
  const [playerState, setPlayerState] = useState<TPlayerState>({
    track: {
      playTime: "0:00",
      index: 0,
      percent: 0,
      loading: false,
      duration: "0:00",
      play: false,
      source: props.tracks[0]
    },
    tracks: props.tracks,
    playlist: false,
    settings: defaultSettings
  });
  const { track, tracks, playlist, settings } = playerState;
  /**
* Player class containing the state of our tracks and where we are in it.
* Includes all methods for playing, skipping, updating the display, etc.
* @param {Array} props.tracks Array of objects with tracks track details ({title, file, howl}).
*/
  const init = () => {
    Howler.volume(Number(defaultSettings.volume));
  }

  function createAudioTrack(track) {
    const howl = new Howl({
      src: [`/src/assets/audio/${track.filename}`],
      html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
      onload: function () {
        console.log(track)
        setPlayerState(state => ({
          ...state,
          track: {
            ...state.track,
            source: track,
            // loading: sound.howl?.state() === 'loaded' ? false : true,
            duration: formatTime(Math.round(track.howl.duration()))
          }
        }));
      },
      onend: function () {
        if(track.id < tracks.length) skip('next');
      }
    });
    return howl;
  }

  function skip(direction: string) {
    const index:number =  direction === "next" ? (track.index + 1 > tracks.length - 1 ?
      0 : track.index + 1) : (track.index - 1 < 0 ? tracks.length - 1 : track.index - 1);
    /**
    * Skip to the next or previous track.
    * @param  {String} direction 'next' or 'prev'.
    */
    // Get the next track based on the direction of the track.
    if (track.source.howl) track.source.howl.stop();
    const clearedTracks = resetHowls(tracks);
    const newTrack = createAudioTrack(clearedTracks[index]);
    newTrack.play();
    setPlayerState(state => ({
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

  function play(value, id) {
    let tracksArr = tracks;
    const playingTrack = getPlayingTrack(tracks);
    if (playingTrack?.id !== id) {
      playingTrack?.howl?.stop();
      tracksArr = resetHowls(tracks);
    };
    const sound = id ? getTrackById(tracksArr, id) : track.source;
    if (!sound?.howl) {
      sound.howl = createAudioTrack(sound);
    }
    const index = id ? getTrackIndex(tracksArr, id) : track.index;
    tracksArr = updatedTracks(tracksArr, index, sound.howl);
    sound.howl.play();
    setPlayerState(state => ({
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
  function pause(value, id) {
    // Get the Howl we want to manipulate.
    const { howl } = id ? getTrackById(tracks, id) : track.source;
    // Pause the sound.
    setPlayerState(state => ({
      ...state,
      track: {
        ...state.track,
        play: value,
      }
    }));
    howl.pause();

  }
  const onTrackChange = (value, id) => {
    if (value) play(value, id || null);
    else pause(value, id || null);
  };
  const togglePlaylist = () => {
    setPlayerState(state => ({ ...state, playlist: !state.playlist }));
  };
  const onClosePlaylist = (value) => {
    setPlayerState(state => ({ ...state, playlist: value }));
  };

  const getReorderedTracks = (array, active) => {
    const activeIndex = +array.findIndex(track => track.id === +active);
    const index = activeIndex === -1 ? 0 : activeIndex;
    const activeTrack = array[activeIndex];
    setPlayerState(state => ({
      ...state,
      tracks: [...array],
      track: {
        ...state.track,
        index: index,
        source: activeTrack
      }
    }));
  };

  useEffect((): void => init(), [0]);
  // useEffect(() => console.log(track), [playerState]);
  useEffect(() => {
    return function cleanup() { destroy() }
  }, []);


  const position = props.position || "fixed";
  const playback = track.play ? "play" : "pause";
  const defaultButtonStyle = {
    boxShadow: buttonStyles[props.theme].boxShadow,
    ...buttonStyles[props.theme].defaultButton
  };
  return (
    <PlayerWrapperSC position={position} className="playerWrapper">
      <div className="container">
        <div className="grid">
          <div className="grid__col-12 mb-0">
            <PlayerSC theme={props.theme} className="player">
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
                    onKeyPress={togglePlaylist}
                    onClick={togglePlaylist} />
                  <Controls
                    theme={props.theme}
                    loading={track.loading}
                    currentTrackIndex={track.index}
                    items={tracks}
                    onSkip={skip}
                    onPlay={onTrackChange}
                    playback={playback}
                    onPause={onTrackChange} />
                  <Volume
                    level={settings.volume}
                    theme={props.theme}
                    muted={settings.muted}
                    slider={{
                      value: settings.volume,
                      start: 50,
                    }}
                  />
                </div>
              </div>
              <Progress
                theme={props.theme}
                percent={track.percent}
                track={track} />
              <Suspense fallback="loading">
                <Playlist
                  show={playlist}
                  theme={props.theme}
                  playback={onTrackChange}
                  onReorder={getReorderedTracks}
                  onPlay={onTrackChange}
                  onPause={onTrackChange}
                  currentTrack={track}
                  items={tracks}
                  onClose={onClosePlaylist} />
              </Suspense>
            </PlayerSC>
          </div>
        </div>
      </div>
    </PlayerWrapperSC>
  );
});

export default Player;