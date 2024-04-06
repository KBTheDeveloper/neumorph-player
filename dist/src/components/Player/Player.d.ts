import React from "react";
import { Howl } from "howler";
import { PlayerProps, TPlayerState } from "./types";
declare class Player extends React.Component<PlayerProps, TPlayerState> {
    constructor(props: any);
    componentWillUnmount(): void;
    getReorderedTracks(values: {
        moved: number;
        target: number;
    }): void;
    skip(direction: string): void;
    stop(): void;
    createAudioTrack(track: any): Howl;
    play(value: any, id: any): void;
    pause(value: boolean, id: number): void;
    onTrackChange(value: any, id: any): void;
    togglePlaylist(): void;
    onClosePlaylist(value: any): void;
    toggleShuffle(): void;
    onRepeat(value: any): void;
    render(): JSX.Element;
}
export default Player;
