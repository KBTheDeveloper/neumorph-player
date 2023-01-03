import React, { FunctionComponent, useEffect } from "react";
import { IconWrapper } from "..";
import { buttonStyles } from "./styles/themes";
import { ControlsProps } from "./types";

export const Controls: FunctionComponent<ControlsProps> = (props: ControlsProps) => {
  const onPlay = (id) => {
    props.onPlay(true, id);
  };
  const onPause = (id) => {
    props.onPause(false, id);
  };

  const seekTypes = {
    "fw": (howl) => howl.seek(howl.seek() + 10),
    "rew": (howl) => howl.seek(howl.seek() - 10)
  };
  const seek = (type) => {
    const { howl } = props.items.find(track => track.howl);
    if (!howl) return;
    seekTypes[type](howl);
  };
  const onPrev = () => {
    props.onSkip("prev");
  };
  const onNext = () => {
    props.onSkip("next");
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', onKeyDown);
    }
  });

  const togglePlay = () => {
    const currentTrack = props.items.find(track => track.howl);
    if (currentTrack?.howl && !currentTrack?.howl._sounds[0]._paused) {
      onPause(currentTrack?.id);
    } else {
      onPlay(currentTrack?.id || 1);
    }
  };
  const keys = {
    ArrowRight: (event) => seek("fw"),
    ArrowLeft: (event) => seek("rew"),
    Space: (event) => {
      togglePlay();
    },
    Enter: (event) => {
      const playButton = event.target.closest('.btn--play') ||
        event.target?.closest('.btn--pause]');
      if (!playButton) return;
      if (playButton.classList.contain("btn---pause")) playButton.focus();
      togglePlay();
    }
  }
  const onKeyDown = (event) => {
    if (event.code in keys) {
      keys[event.code](event);
    }
  }
  const playButtonStyle = {
    ...buttonStyles[props.theme].playButton
  };
  const defaultButtonStyle = {
    ...buttonStyles[props.theme].defaultButton
  };
  const buttons = props.playback === "play"
    ? <IconWrapper
      role="button"
      title="Pause"
      tabIndex="0"
      noAlign={true}
      styles={playButtonStyle}
      classes="btn--pause mr-5"
      iconName="pause"
      onClick={togglePlay}
      onKeyPress={togglePlay} /> :
    <IconWrapper
      title="Play"
      role="button"
      tabIndex="0"
      styles={playButtonStyle}
      noAlign={true}
      classes="btn--play mr-5"
      iconName="play"
      onClick={togglePlay}
      onKeyPress={togglePlay} />;
  return (
    <div className="controls d-flex align-items--center">
      <IconWrapper
        noAlign={true}
        title="Previous track"
        role="button"
        tabIndex="0"
        styles={defaultButtonStyle}
        classes="mr-5"
        iconName="prev"
        onClick={onPrev}
        onKeyPress={onPrev} />
      <div id="loading"
        style={{ display: props.loading ? "block" : "none" }}
        className="mr-5" />
      {buttons}
      <IconWrapper
        title="Next track"
        role="button"
        noAlign={true}
        tabIndex="0"
        styles={defaultButtonStyle}
        iconName="next" onClick={onNext}
        onKeyPress={onNext} />
    </div>
  );
};