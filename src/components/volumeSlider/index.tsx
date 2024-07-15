import React from "react";
import { appPalette } from "@/utils/guides";
import { mixins } from "@/styles/jss/mixins";
import styled from "styled-components";
import { volumeStyles } from "../Player/styles/themes";
import { SliderProps } from "./types";

const thumbSizes = {
  width: 20,
  height: 20,
};

const RangeSliderSC = styled.div((props) => ({
  "&.range-slider": {
    position: "relative",
    ...mixins.neuMorphismShadow("4px 4px 8px rgba(0, 0, 0, 0.25)", "-4px -4px 8px rgba(255, 255, 255, 0.03)"),
    "&:after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: appPalette.white,
      zIndex: -1,
      borderRadius: "4px 4px 7px 7px",
    },
  },
  ".range-slider__thumb": {
    position: "absolute",
    bottom: -12,
    transition: "all .1s ease",
    "&:after": {
      content: "''",
      ...thumbSizes,
      position: "absolute",
      left: 0,
      borderRadius: "50%",
      backgroundColor: appPalette.white,
      ...mixins.neuMorphismShadow("4px 4px 8px rgba(0, 0, 0, 0.25)", "-4px -4px 8px rgba(255, 255, 255, 0.03)"),
    },
    ...thumbSizes,
  },
  ".range-slider__process-line": {
    ...volumeStyles[props.theme].processLine,
    position: "absolute",
    bottom: 0,
    height: "100%",
    width: "100%",
    borderRadius: 3,
  },
  ".range-slider__base": {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 1,
    "&:after": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: "50%",
      padding: "0 15px",
      transform: "translateX(-50%)",
    },
  },
  ".range-slider__origin": {
    zIndex: 1,
    position: "absolute",
    left: "50%",
    top: "-100%",
    height: "100%",
    width: 0,
  },
  "&.slider-round--horizontal": {
    borderRadius: 5,
    ...mixins.neuMorphGradient({ first: "#4C155D", second: "#2A1433" }),
    "& [class*=range-slider__thumb]": {
      top: "50%",
      transform: "translateY(-50%)",
    },
  },
  "&.slider-round--vertical": {
    borderRadius: 5,
    "& [class*=range-slider__thumb]": {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
}));
const viewsStyle = {
  "round-vertical": "slider-round--vertical",
  "round-horizontal": "slider-round--horizontal",
};
const themes = {
  orange: "slider--theme_orange",
};

const RangeSlider: React.FunctionComponent<SliderProps> = React.memo((props: SliderProps) => {
  const sliderRef = React.useRef(null);
  const defaultThumbPos = 100;
  const [thumbPosition, setThumbPosition] = React.useState(defaultThumbPos);
  const [percent, setPercent] = React.useState(0);

  const defaultParams = {
    width: props.sizes ? props.sizes.width : 200,
    height: props.sizes?.height || "100%",
    orientation: props.orientation ?? "horizontal",
  };
  const setValue = (value) => {
    const thumbValue = value > 0 || value < 100 ? 100 - value : value >= 100 ? 0 : 100;
    setPercent(value);
    setThumbPosition(thumbValue);
    props.onChange(value);
  };
  const moveThumb = (view) => {
    const { top, left, width, height } = sliderRef.current.getBoundingClientRect();
    const views = {
      "round-horizontal": (params: {
        currentTarget: HTMLElement;
        clientX: number;
        shiftyX: number;
        offsetWidth: number;
      }) => {
        const shiftX = params.clientX - params.currentTarget.getBoundingClientRect().left;
        let newLeft = params.clientX - shiftX - left;
        const rightEdge = width - params.offsetWidth;
        newLeft = newLeft < 0 ? 0 : newLeft > rightEdge ? rightEdge : params.clientX - shiftX - left;
        return (newLeft / rightEdge) * 100;
      },
      "round-vertical": (params: { clientY: number; shiftY: number; type: string }) => {
        let newTop =
          params.type === "click"
            ? (params.shiftY / height) * 100
            : ((params.clientY - params.shiftY - top) / height) * 100;
        if (newTop <= 0) newTop = 0;
        const bottomEdge = 100;
        if (newTop > bottomEdge) newTop = 100;
        return (newTop / bottomEdge) * 100;
      },
    };
    return views[view];
  };

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { currentTarget, clientY } = event;
      event.preventDefault();
      const shiftY = clientY - currentTarget.getBoundingClientRect().top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      function onMouseMove(e: MouseEvent) {
        const { clientY, type } = e;
        setTimeout(() => {
          const per = moveThumb(props.view)({ clientY, shiftY, type });
          setValue(100 - per);
        }, 100);
      }
      function onMouseUp(): void {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      }
    },
    [percent],
  );

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      const { clientY, type } = event;
      const shiftY = event.clientY - event.currentTarget.getBoundingClientRect().top;
      const per = moveThumb(props.view)({ clientY, shiftY, type });
      setValue(100 - per);
    },
    [percent],
  );
  const onKeyDown = (event) => {
    const { code } = event;
    const isArrowUp = code === "ArrowUp";
    const isArrowDown = code === "ArrowDown";
    let per = percent;
    if ((per >= 100 && isArrowUp) || (per <= 0 && isArrowDown)) return;
    per = isArrowUp ? Math.round(per) + 1 : isArrowDown ? Math.round(per) - 1 : per;
    setValue(per);
  };
  const onWheel = React.useCallback(
    (event) => {
      const per =
        percent < 100 && event.deltaY < 0
          ? Math.round(percent) + 1
          : percent > 0 && event.deltaY > 0
            ? Math.round(percent) - 1
            : percent;
      setValue(per);
    },
    [percent],
  );
  React.useEffect(() => {
    setValue(props.start * 100);
  }, [props.start]);
  const position =
    props.view === "round-horizontal"
      ? { transform: `translate(${thumbPosition}%, 0` }
      : { transform: `translate(0, ${thumbPosition}%)` };
  const processLineFill = props.orientation === "horizontal" ? { width: `${percent}%` } : { height: `${percent}%` };
  return (
    <RangeSliderSC
      data-testid='range-slider'
      tabIndex='0'
      onKeyDown={onKeyDown}
      theme={props.theme}
      id={`slider-${props.view}`}
      onWheel={onWheel}
      className={`range-slider ${viewsStyle[props.view]}
      ${themes[props.color]}`}
      style={{ height: defaultParams.height, width: defaultParams.width }}
      ref={sliderRef}
    >
      <div className='range-slider__base' onClick={onClick}>
        <div className='range-slider__process-line' style={processLineFill}></div>
        <div className='range-slider__origin' style={position}>
          <div onMouseDown={onMouseDown} className='range-slider__thumb'></div>
        </div>
      </div>
    </RangeSliderSC>
  );
});
RangeSlider.displayName = "RangeSlider";

export default RangeSlider;
