import React, { useCallback } from "react";
import RangeSlider from "../volumeSlider";
import styled from "styled-components";
import { buttonStyles, volumeStyles } from "./styles/themes";
import { keyFrames } from "../../styles/jss/keyframes";
import { VolumeProps } from "./types";
import { IconWrapper } from "../Icon/IconWrapper";

const VolumeSC = styled.button((props) => ({
  "@keyframes fadeInVolume": keyFrames["@keyframes fadeIn"]("bottom", 60),
  "@keyframes fadeoutVolume": keyFrames["@keyframes fadeOut"]("bottom", 60),
  "&.volumeBtn": {
    width: 40,
    height: 40,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    ...buttonStyles[props.theme].defaultButton,
    borderRadius: "50%",
    cursor: "pointer",
    "&:before": {
      content: '""',
      height: 80,
      width: "100%",
      display: "none",
      position: "absolute",
      bottom: 0,
      left: 0,
    },
    "&.hidden": {
      "& .volume": {
        animation: "fadeoutVolume ease .4s",
      },
    },
    "&.visible": {
      "& .volume": {
        animation: "fadeInVolume ease .4s",
        opacity: 1,
        bottom: 60,
      },
      "&:before": {
        display: "block",
      },
    },
    "& svg": {
      cursor: "pointer",
    },
  },
  ".volume": {
    borderRadius: 5,
    width: 40,
    height: 250,
    transform: "translateX(-50%)",
    position: "absolute",
    bottom: -500,
    left: "50%",
    ...volumeStyles[props.theme].sliderContainer,
    touchAction: "none",
    "-webkit-user-select": "none",
    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
    opacity: 0,
    zIndex: 20,
  },
  ".volume--muted": {
    filter: "grayscale(1)",
    cursor: "not-allowed",
    "& .range-slider": {
      pointerEvents: "none",
    },
  },
}));
export const Volume: React.FunctionComponent<VolumeProps> = React.memo((props: VolumeProps) => {
  const volumeRef = React.useRef<HTMLDivElement>(null);
  const volumeBtnRef = React.useRef<HTMLButtonElement>(null);
  const [slider, setSlider] = React.useState(false);
  const [icon, setIcon] = React.useState<string>("volumeHigh");
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [mute, setMute] = React.useState(false);
  const showSlider = () => {
    volumeBtnRef.current.classList.remove("hidden");
    volumeBtnRef.current.classList.add("visible");
  };
  const hideSlider = () => {
    volumeBtnRef.current.classList.remove("visible");
    volumeBtnRef.current.classList.add("hidden");
  };
  const onMouseOut = useCallback((e) => {
    const { relatedTarget } = e;
    const target = e.target.closest(".volume");
    if ((!target || (!target.contains(relatedTarget) && !isMouseDown)) && e.pointerType === "mouse") {
      hideSlider();
    }
  }, []);
  const onPointerOver = useCallback(() => {
    setSlider(true);
    showSlider();
  }, []);
  const toggleSlider = useCallback(() => {
    if (volumeBtnRef.current.classList.contains(".visible")) {
      hideSlider();
    } else {
      showSlider();
    }
    setSlider(!slider);
  }, [slider]);
  const onVolumeChange = useCallback(
    (value) => {
      window.localStorage.setItem("player_settings", JSON.stringify({ settings: { volume: value } }));
      const icon = value > 50 ? "volumeHigh" : value === 0 ? "mute" : "volumeMedium";
      setIcon(icon);
      window.Howler.volume(value / 100);
    },
    [mute],
  );
  const getVolume = () => {
    const volume = window.localStorage.getItem("player_settings")
      ? JSON.parse(window.localStorage.getItem("player_settings"))?.settings?.volume / 100
      : props.level / 100;
    return mute ? 0 : volume;
  };
  const onVolumeClick = useCallback(
    (event) => {
      const found = event.target.classList.contains("volumeBtn");
      if (found && event.pointerType === "mouse") {
        if (window.Howler._muted) {
          if (getVolume() === 0) {
            onVolumeChange(50);
          }
          window.Howler.mute(false);
          setMute(false);
        } else {
          window.Howler.mute(true);
          setMute(true);
        }
      }
    },
    [getVolume],
  );

  React.useEffect(() => {
    const fader = volumeRef.current.querySelector(".range-slider__thumb");
    window.Howler.volume(getVolume());
    const onMouseDown = () => {
      setIsMouseDown(true);

      document.addEventListener("pointerup", onMouseUp);

      function onMouseUp(e) {
        setIsMouseDown(false);
        const faderEl = e.target.closest(".range-slider__base");
        if (!faderEl) {
          setSlider(false);
          hideSlider();
        }
        document.removeEventListener("pointerup", onMouseUp);
      }
    };
    fader.addEventListener("pointerdown", onMouseDown);
    return function cleanup() {
      fader.removeEventListener("pointerdown", onMouseDown);
    };
  }, []);
  const muted = mute ? "volume--muted" : "";
  return (
    <VolumeSC
      data-testid='volume'
      theme={props.theme}
      ref={volumeBtnRef}
      className={`volumeBtn btn btn--volume ml-auto`}
      onPointerOver={onPointerOver}
      onPointerDown={onVolumeClick}
      onKeyPress={toggleSlider}
      onPointerEnter={onPointerOver}
      onPointerOut={onMouseOut}
    >
      <div
        id='volume'
        ref={volumeRef}
        className={`volume fadeout d-flex justify-center align-items--center${muted} py-5`}
      >
        <RangeSlider
          theme={props.theme}
          view='round-vertical'
          color='orange'
          orientation='vertical'
          onChange={onVolumeChange}
          sizes={{ width: 10 }}
          start={getVolume()}
          min={0}
          max={100}
        />
      </div>
      <IconWrapper
        title='Volume'
        sizes={{
          width: 25,
          height: 25,
          viewBox: "0 0 25 25",
        }}
        noAlign={true}
        iconName={mute ? "mute" : icon}
      />
    </VolumeSC>
  );
});
Volume.displayName = "Volume";
