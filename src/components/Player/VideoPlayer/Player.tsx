import React from "react";
import styled from "styled-components";
import { HTMLVideoPlayerType } from "./types";
import { IconWrapper } from "../../Icon/IconWrapper";

const VideoPlayerSC = styled.div(() => ({
  position: "absolute",
  bottom: "100%",
  width: "100%",
  left: 0,
  video: {
    width: "100%",
  },
  "&:hover > .video-player__controls": {
    background: "rgba(30, 29, 43, .9)",
    opacity: 1
  }
}));
const VideoPlayerControls = styled.div({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  opacity: 0,
  transition: "opacity .2s ease",

})

export const HTMLVideoPlayer = React.forwardRef<HTMLVideoElement, HTMLVideoPlayerType>((props: HTMLVideoPlayerType, ref: { current: HTMLVideoElement | null }) => {
  const { url } = props;
  let ext = url?.match(/\.\w*$/)[0].replace(".", "");
  ext = ext !== "mov" ? ext : "mp4";
  const togglePIP = () => {
    if (document.pictureInPictureElement) document.exitPictureInPicture();
    else if (document.pictureInPictureEnabled) ref?.current.requestPictureInPicture();
  };
  const toggleFullScreen = () => {
    const video = ref.current;
    if (video.requestFullscreen)
      video.requestFullscreen();
    else document.exitFullscreen();
  }
  return (<VideoPlayerSC className="d-flex">
    <video ref={ref} muted>
      <source src={props.url} type={`video/${ext}`} />
      Sorry, your browser doesn't support embedded videos
    </video>
    <VideoPlayerControls className="video-player__controls d-flex justify-end">
      <div className="video-player__controls-full-screen">
        <IconWrapper
          noAlign={true}
          title="Full Screen mode"
          role="button"
          disabled={!props.url}
          tabIndex="0"
          iconName="fullScreen"
          onClick={toggleFullScreen} />
      </div>
      <div className="video-player_controls-pip">
        <IconWrapper
          noAlign={true}
          title="Picture-In-Picture mode"
          role="button"
          disabled={!props.url}
          tabIndex="0"
          iconName="PIPRight"
          onClick={togglePIP} />
      </div>
    </VideoPlayerControls>
  </VideoPlayerSC>);
});