import { combineReducers } from 'redux';
import { PlayerReducer } from './reducers/player';
export interface IPlayerSettings {
  volume: number,
  muted: boolean,
  showSlider: boolean
}

interface ITrack {
  title: string,
  filename: string,
  artist: string,
  id: number,
  howl: HowlerGlobal | null,
  cover: string
}

interface ICurrentTrack {
  playTime: string,
  index: number,
  percent: number,
  loading: boolean,
  duration: string,
  play: boolean,
}
export interface IPlayerReducer {
  tracks: ITrack[],
  currentTrack: ICurrentTrack,
  settings: IPlayerSettings
}
const rootReducer = combineReducers({
  player: PlayerReducer,
})

export default rootReducer;