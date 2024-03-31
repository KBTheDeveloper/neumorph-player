import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { formatTime } from "../../utils/helpers";
import { Tooltip } from "..";
import styled from "styled-components";
import { IProgress } from "./types";
import { progressStyles } from "./styles/themes";
import { Howl } from "howler";

const ProgressSC = styled.div((props) => ({
  position: "absolute",
  left: 0,
  width: "100%",
  height: 10,
  cursor: "pointer",
  overflow: "hidden",
  ".progressLine": {
    ...progressStyles[props.theme].progressLine,
    transition: "all .3s ease",
    transformOrigin: 0,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 10,
  },
  ".bar": {
    background: "rgba(255,255,255,.3)",
    width: "100%",
    height: 10,
    boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.33)",
    opacity: 0.9,
  },
}));
let requestAnimationFrameId: number;
const step = function (context, element) {
  // Get the Howl we want to manipulate.
  // Determine our current seek position.
  // If the sound is still playing, continue stepping.

  const value = context?.seek ? (context.seek() / context.duration()) * 100 : 0;
  element.style.width = `${value}%`;
  requestAnimationFrameId = requestAnimationFrame(step.bind(null, context, element));
};
let trackIsMounted: null | Howl;
const Progress: React.FunctionComponent<IProgress> = memo((props: IProgress) => {
  const progress = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGRectElement | null>(null);
  const sound = props.track.source.howl;
  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    position: { x: 0, y: 0 },
  });

  const showTime = (per: number) => {
    // Convert the percent into a seek position.
    if (sound) {
      return formatTime(sound.duration() * per).replace(/\.\d+/, "");
    }
  };
  /**
   * Seek to a new position in the currently playing track.
   * @param  {Number} per Percentage through the song to skip.
   */
  const seek = useCallback(
    function (event) {
      if (!sound) return;
      const { x } = progress.current.getBoundingClientRect();
      const per = (event.clientX - x) / progress.current.offsetWidth;
      sound.seek(sound.duration() * per);
    },
    [sound],
  );
  const onMouseMove = useCallback(
    (event) => {
      if (!sound) return;
      const { x, y } = progress.current.getBoundingClientRect();
      setTooltip((state) => ({
        ...state,
        position: {
          y: tooltip.position.y === 0 ? y - 50 : tooltip.position.y,
          x: event.clientX < 0 ? 0 : event.clientX - 46 / 2,
        },
        text: showTime((event.clientX - Math.floor(x)) / progress.current.offsetWidth),
      }));
    },
    [tooltip],
  );
  const onMouseOver = useCallback(() => {
    if (!sound) return;
    setTooltip((state) => ({ ...state, show: true }));
  }, [tooltip]);
  const onMouseOut = useCallback(() => {
    if (!trackIsMounted) return;
    setTooltip((state) => ({ ...state, show: false }));
  }, [tooltip]);
  useEffect(() => {
    requestAnimationFrameId = requestAnimationFrame(step.bind(null, sound, lineRef?.current));
    return function cleanup() {
      window.cancelAnimationFrame(requestAnimationFrameId);
    };
  });

  return (
    <ProgressSC
      id='progress'
      data-testid='progress'
      theme={props.theme}
      role='progressbar'
      className='progress mt-4'
      onClick={seek}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseMove={onMouseMove}
      ref={progress}
    >
      <div className='bar'></div>
      <svg width={progress.current?.offsetWidth} height='10' id='progressLine' className='progressLine'>
        <rect height='10' ref={lineRef}></rect>
      </svg>
      <div id='tooltipWrapper'>
        <Tooltip theme='white' position='absolute' dir='bottom' show={tooltip.show} text={tooltip.text} />
      </div>
    </ProgressSC>
  );
});

Progress.displayName = "Progress";

export default Progress;
