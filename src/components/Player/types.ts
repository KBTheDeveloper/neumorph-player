import { Howl } from 'howler';
import { IPlayerSettings } from "../../store/reducer";

export interface IPlayerMethods {
  onPause: Function,
  onPlay: Function,
  onSkip: Function,
}

export interface IProgress {
  track: any,
  theme: string,
  percent: number,
  children?: React.ReactFragment
}
export interface TrackInfoProps {
  title: string,
  cover?: string,
  artist: string,
  track: Howl | null,
  duration: string,
  children?: any,
}

export interface TrackItem extends Omit<IPlayerMethods, "onSkip"> {
  id?: string,
  item: {
    id: number,
    title: string,
    artist: string,
    cover: string,
    howl: any,
  },
  theme: string,
  index: number,
  onDrop?: Function,
  children?: React.ReactFragment
}

export type TrackType = {
  title: string,
  filename: string,
  artist: string,
  id: number,
  howl: any,
  cover: string,
};

export type PlayerProps = {
  tracks: Array<TrackType>,
  position?: "absolute" | "fixed" | "relative",
  theme: string,
  children?: any;
}

export type TTooltip = {
  show: boolean,
  text: string,
  position: { x: number, y: number }
};
export type TCurrentTrack = {
  playTime: string,
  index: number,
  percent: number,
  loading: boolean,
  duration: string,
  play: boolean,
  source: TrackType
}

export type ControlsProps = IPlayerMethods & {
  loading: boolean,
  items: any[],
  theme: string,
  playback: string,
  currentTrackIndex: any,
  children?: any,
}

export interface IPlaylist extends Omit<IPlayerMethods, "onSkip"> {
  items: TrackType[],
  theme: string,
  currentTrack: TCurrentTrack,
  show: boolean,
  playback: Function,
  onClose: Function,
  onReorder: Function
}
export type TIconBg = {
  bg: string,
  hoverBg: string
}

export type TPlayerState = {
  track: TCurrentTrack,
  tracks: TrackType[],
  playlist: boolean,
  settings: IPlayerSettings
}

export type VolumeProps = {
  slider: {
    start: number,
    value?: number,
  },
  level: number,
  theme: string,
  muted: boolean,
  children?: any,
}