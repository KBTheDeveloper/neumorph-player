import { mdiPause, mdiPlay } from "@mdi/js";
import React, { useEffect, useState, useCallback } from "react";
import { appPalette } from "../../utils/guides";
import { Button } from "../../components";
import styled from "styled-components";
import { TrackItem } from "./types";
import { buttonStyles } from "./styles/themes";
import { State } from "howler";

const TrackSC = styled.li.attrs((props => ({
  draggable: true
})))`
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
  &.dragging {
    box-shadow: -3px -3px 1px 0px rgba(186, 118, 255, 0.40), 0.5px 0.5px 5px 0px rgba(186, 118, 255, 0.40)!important;
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
  & .visualizer {
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
  const onPlay = useCallback(() => {
    props.onPlay(true, props.item.id);
    setPlay(true);
  }, [play]);
  const onPause = useCallback(() => {
    props.onPause(false, props.item.id);
    setPlay(false);
  }, [play]);
  useEffect(() => {
    if (play && props.item.howl && props.item.howl._sounds[0]._paused) {
      setPlay(false);
    }
  });

  const onDragStart = (e: React.DragEvent & { target: HTMLElement }) => {
    const item = e.target.closest('.playlist__item') as HTMLElement;
    item.classList.add('dragging');
    props.onMove(+item.dataset.track)
  };
  const onDragOver = (e: React.DragEvent & { target: HTMLElement }) => {
    e.preventDefault();
  };
  const onDragEnd = (e: React.DragEvent & { target: HTMLElement }) => {
    const draggingItem = e.target.closest('.playlist__item.dragging') as HTMLElement;
    draggingItem.classList.remove('dragging');
  };


  const pauseBtn = <Button
    tabIndex="0"
    view="fab--small"
    styles={{ ...buttonStyles[props.theme].defaultButton }}
    clickHandler={onPause}
    icon={{ path: mdiPause, width: 30, height: 30, viewBox: "0 0 25 25", color: appPalette.white }} />;
  const playBtn = <Button
    tabIndex="0"
    view="fab--small"
    styles={{ ...buttonStyles[props.theme].defaultButton }}
    clickHandler={onPlay}
    icon={{ path: mdiPlay, width: 30, height: 30, viewBox: "0 0 25 25", color: appPalette.white }} />;
  const isPlay = play || (props.item.howl && !props.item.howl._sounds[0]._paused) ? pauseBtn : playBtn;

  return <TrackSC
    data-testid="track"
    tabIndex="0"
    className={`playlist__item d-flex align-items--center pa-3 ${play ? 'playlist__item--is-playing' : ""}`}
    onDragOver={onDragOver}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
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