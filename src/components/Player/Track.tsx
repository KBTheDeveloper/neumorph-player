import { mdiPause, mdiPlay } from "@mdi/js";
import React, { useEffect, useState } from "react";
import { appPalette } from "../../utils/guides";
import { Button } from "../../components";
import { mixins } from "../../styles/jss/mixins";
import styled from "styled-components";
import { TrackItem } from "./types";
import { buttonStyles } from "./styles/themes";
const TrackSC = styled.li.attrs(props => ({
  draggable: true}))`
  &button {
    border: none;
    padding: 10px 5.5rem;
    font-size: 1.4em;
    cursor: pointer;
    &.visible {
      display: block;
    }
  }
  .close-btn--cross {
    cursor: pointer;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 5px;
    top: 10px;
  }
  &.playlist__item {
    ${mixins.neuMorphismShadowSC("inset 1px 1px 0.5px rgba(255, 255, 255, 0.06)", "inset -10px -10px 52px rgba(49, 48, 65, 0.25)")};
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: pointer;
    z-index: 5;
    position: relative;
    &:hover {
      & button {
        display: flex;
      }
    }
    &.selected {
      opacity: 1;
      border: 2px solid ${appPalette.lightPurple};
    }
    & button {
      display: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .playlist__item-cover {
    width: 50px;
    height: 50px;
    position: relative;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  &.playlist__item--is-playing {
    & .visualiser {
      display: "flex";
    }
  }
  .playlist__item-info {
    line-height: 1.4;
    color: ${appPalette.white};
  }
  .playlist__item-title {
    font-weight: 500;
  }
  .playlist__item-artist-name {
    color: #b5b5b5;
    cursor: pointer;
  }
  .fab {
    border-radius: 3px !important;
    display: flex;
    border-radius: 0;
  }
  .button--orange {
    background-color: ${appPalette.orange};
    color: ${appPalette.white};
  }
  .button--transparent {
    background-color: transparent;
  }
}`;

export const Track: React.FunctionComponent<TrackItem> = (props: TrackItem) => {
  const [play, setPlay] = useState(false);
  const onPlay = () => {
    props.onPlay(true, props.item.id);
    setPlay(true);
  };
  const onPause = () => {
    props.onPause(false, props.item.id);
    setPlay(false);
  };
  // const onDragStart = (ev) => {
  //   ev.target.classList.add("selected");
  // };
  // const onDragEnd = (ev) => {
  //   ev.target.classList.remove("selected");
  // };
  useEffect(() => {
    if (play && props.item.howl && props.item.howl._sounds[0]._paused) {
      setPlay(false);
    }
  });
  
  const pauseBtn = <Button
    tabIndex="0"
    view="fab--small"
    styles={{...buttonStyles[props.theme].defaultButton}}
    clickHandler={onPause}
    icon={{ path: mdiPause, width: 30, height: 30, viewBox: "0 0 25 25", color: appPalette.white }} />;
  const playBtn = <Button
    tabIndex="0"
    view="fab--small"
    styles={{...buttonStyles[props.theme].defaultButton}}
    clickHandler={onPlay}
    icon={{ path: mdiPlay, width: 30, height: 30, viewBox: "0 0 25 25", color: appPalette.white }}/>;
  const isPlay = play || (props.item.howl && !props.item.howl._sounds[0]._paused) ? pauseBtn : playBtn;

  return <TrackSC
    tabIndex="0"
    className={`playlist__item d-flex align-items--center pa-3 ${play ? 'playlist__item--is-playing' : ""}`}
    data-track={`${props.item.id}`}
    key={props.item.title}>
    <div className='playlist__item-cover mr-2' style={{ backgroundImage: `url('src/assets/img/${props.item.cover}')` }}>
      {isPlay}
    </div>
    <div className='playlist__item-info'>
      <div className='playlist__item-title'>{props.item.title}</div>
      <span className="playlist__item-artist-name flex-grow-1">{props.item.artist}</span>
    </div>
  </TrackSC>
};

