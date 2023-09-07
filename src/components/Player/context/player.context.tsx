import React, { useMemo } from "react";
import { TPlayerState } from "../types";
const initialState = {
  tracks: [],
  track: null,
};
type Action = {type: "SET_TRACKS"} | {type: "SET_CURRENT_TRACK"};
type Dispatch = (action: Action) => void;
type PlayerState = Omit<TPlayerState, "playlist" | "settings">;
export const PlayerContext = React.createContext(initialState);


export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
export const SET_TRACKS = "SET_TRACKS";

export function setCurrentTrack(track) {
  return {type: "SET_CURRENT_TRACK", track};
}

export function setTracks(tracks) {
  return {type: "SET_TRACKS", tracks};
}

export function PlayerReducer(state: PlayerState, action: Action) {
  switch(action.type) {
    case "SET_CURRENT_TRACK":
      return {...state, track: state.track};
    case "SET_TRACKS":
      return {...state, tracks: state.tracks};
    default:
      return state;
  }
}

function PlayerProvider(props) {
  const [state, dispatch] = React.useReducer(PlayerReducer, initialState);

  const data = useMemo(() => ({ state, dispatch }), [props.state]);
  return <PlayerContext.Provider value={ data } {...props } />;
}

function usePlayerContext() {
  const context = React.useContext(PlayerContext);
  if(!context) throw new Error("usePlayerContext must be used within a PlayerProvider");
  return context;
}

export {PlayerProvider, usePlayerContext};