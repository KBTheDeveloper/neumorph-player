export interface IVideoPlayer {
  url: string | null;
  sound: Record<string, unknown>;
  theme: string;
}

export type HTMLVideoPlayerType = Omit<IVideoPlayer, "theme">;
