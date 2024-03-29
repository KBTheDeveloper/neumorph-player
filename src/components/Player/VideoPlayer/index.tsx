import React, { useEffect, useState } from "react";
import { IconWrapper } from "../..";
import { buttonStyles } from "../styles/themes";
import { IVideoPlayer } from "./types";
import { createPortal } from "react-dom";
import { HTMLVideoPlayer } from "./Player"
import { appPalette } from "../../../utils/guides";

const VideoPlayer = React.forwardRef<HTMLVideoElement, IVideoPlayer>((props, ref: React.RefObject<HTMLVideoElement>) => {
  const VideoPlayerContainer = document.querySelector(".player");
  const [show, setShow] = useState(false);
  const onClick = (): void => setShow(!show);
  const styles = {
    ...buttonStyles[props.theme].defaultButton,
    ...show && { background: `linear-gradient(145deg, ${appPalette.violet2} 0%, ${appPalette.violet} 100%)` }
  };
  useEffect(() => {
    return function cleanup() {
      setShow(false);
    }
  }, [props.url]);
  useEffect(() => {
    // @ts-ignore
    const tracks = props.sound?._sounds;
    if (tracks && show) {
      ref.current.currentTime = tracks[0]._seek || 0;
      if (!tracks[0]._paused) ref.current.play()
    }
  }, [show]);
  return (<>
    <IconWrapper
      noAlign={true}
      title="Open video"
      role="button"
      disabled={!props.url}
      tabIndex="0"
      styles={styles}
      iconName="movie"
      onClick={onClick} />
    {show && createPortal(<HTMLVideoPlayer data-testid="video-player" ref={ref} sound={props.sound} url={props.url} />, VideoPlayerContainer)}</>)

});
export default VideoPlayer;