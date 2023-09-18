import { Howl } from "howler";

export interface IVideoPlayer {
  url: string | null;
  sound: Howl,
  theme: string;
}

export type HTMLVideoPlayerType = Omit<IVideoPlayer, "theme">;