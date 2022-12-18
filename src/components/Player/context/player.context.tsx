import React from "react";
import { TState } from "../types";
const initialState = {
  tracks: [],
  currentTrack: null,
};
type Action = {type: "SET_TRACKS"} | {type: "SET_CURRENT_TRACK"};
type Dispatch = (action: Action) => void;
export const PlayerContext: React.Context<{state: TState, dispatch: Dispatch} | undefined> = React.createContext(undefined);


export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
export const SET_TRACKS = "SET_TRACKS";

export function setCurrentTrack(track) {
  return {type: "SET_CURRENT_TRACK", track};
}

export function setTracks(tracks) {
  return {type: "SET_TRACKS", tracks};
}

export function PlayerReducer(state: TState, action: Action) {
  switch(action.type) {
    case "SET_CURRENT_TRACK":
      return {...state, currentTrack: state.currentTrack};
    case "SET_TRACKS":
      return {...state, tracks: state.tracks};
    default:
      return state;
  }
}

function PlayerProvider(props) {
  const [state, dispatch] = React.useReducer(PlayerReducer, initialState);

  const data = { state, dispatch };
  return <PlayerContext.Provider value={ data } {...props } />;
}

function usePlayerContext() {
  const context = React.useContext(PlayerContext);
  if(!context) throw new Error("usePlayerContext must be used within a PlayerProvider");
  return context;
}

export {PlayerProvider, usePlayerContext};