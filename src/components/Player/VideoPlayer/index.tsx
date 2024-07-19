import React, { useEffect, useState, useRef } from "react";
import { IconWrapper } from "../..";
import { buttonStyles } from "../styles/themes";
import { IVideoPlayer } from "./types";
import { createPortal } from "react-dom";
import HTMLVideoPlayer from "./Player";
import { appPalette } from "../../../utils/guides";

const VideoPlayer = (props: IVideoPlayer) => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const VideoPlayerContainer = document.querySelector(".player");
  const [show, setShow] = useState(false);
  const onClick = (): void => setShow(!show);

  const styles = {
    ...buttonStyles[props.theme].defaultButton,
    ...(show && { background: `linear-gradient(145deg, ${appPalette.violet2} 0%, ${appPalette.violet} 100%)` }),
  };
  const { paused } = props!.sound!._sounds;
  useEffect(() => {
    return function cleanup() {
      setShow(false);
    };
  }, [props.url]);
  useEffect(() => {
    if (!paused) videoPlayerRef!.current!.play();
  }, [props, paused]);
  useEffect(() => {
    const tracks = props!.sound!._sounds;
    const video = videoPlayerRef;
    if (tracks && show) {
      video!.current!.currentTime = tracks[0]._seek || 0;
      console.log(video);
      if (!tracks[0]._paused) video!.current!.play();
    }
  }, [props, show, props.sound._sounds]);
  return (
    <>
      <IconWrapper
        noAlign={true}
        title='Open video'
        role='button'
        disabled={!props.url}
        tabIndex='0'
        styles={styles}
        iconName='movie'
        onClick={onClick}
      />
      {show &&
        createPortal(
          <HTMLVideoPlayer data-testid='video-player' ref={videoPlayerRef} sound={props.sound} url={props.url} />,
          VideoPlayerContainer!,
        )}
    </>
  );
};

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
