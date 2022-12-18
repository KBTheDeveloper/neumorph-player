import { IPlayerReducer } from './../reducer';

const initialPlayerState: IPlayerReducer = {
      tracks: [
        {
          title: "I Feel Like feat. Kevin Gates",
          artist: "2 Chainz",
          filename: "07-2_Chainz-I_Feel_Like_Feat_Kevin_Gates",
          id: 1,
          howl: null,
          cover: "2chainz-00-cover.jpg"
        },
        {
          title: "GOAT Feat The Dream",
          artist: "2 Chainz",
          filename: "08-2_Chainz-GOAT_Feat_The_Dream_Prod_By_Bwheezy_Mike_Dean",
          id: 2,
          howl: null,
          cover: "2chainz-00-cover.jpg"
        },
        {
          title: 'Running Out',
          filename: '08-2_Chainz-GOAT_Feat_The_Dream_Prod_By_Bwheezy_Mike_Dean',
          artist: "Unknown Artist",
          id: 3,
          howl: null,
          cover: "2chainz-00-cover.jpg"
        }
      ],
      currentTrack: {
        playTime: "0:00",
        index: 0,
        percent: 0,
        loading: false,
        duration: "0:00",
        play: false,
      },
      settings: {
          volume: +JSON.parse(window.localStorage.getItem("player_settings")).volume / 100 || 0.5,
          muted: false,
          showSlider: false
      }
};

export const PlayerReducer = (state = initialPlayerState, action) => {
  switch (action.type) {
    case "tracks/getTracks": {
      return {
        ...state,
        tracks: [...action.payload]
      };
    }
    case "tracks/getTracks": {
      return {
        ...state,
        tracks: [...state.tracks, ...action.payload]
      };
    }
    case "tracks/setCurrentTrack": {
      return {
        ...state,
          currentTrack: { ...state.currentTrack, ...action.payload }
      };
    }
    case "settings/setCurtain": {
      return {
        ...state,
        settings: {
          ...state.settings,
          curtain: { ...state.settings.curtain, ...action.payload }
        }
      };
    }
    // case "setting/setVolume": {
    //   localStorage.setItem('player_settings', JSON.stringify({ ...action.payload }));
    //   return {
    //     ...state,
    //     settings: {...state.settings, volume: { ...state.settings.volume, ...action.payload }}
    //   };
    // }
    default:
      return state;
  }
};

export const SettingsReducer = (state = initialPlayerState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}


export const fetchTracks = async (dispatch): Promise<any> => {
  try {
    const tracks: any = await http.get(api.tracks);
    return dispatch({ type: "tracks/getTracks", payload: [...tracks] });
  } catch (e) {
    return dispatch({ type: "tracks/getTracks", payload: [] });
  }
};


export const fetchTrack = (id, token) => {
  return async (dispatch): Promise<any> => {
    try {
      const tracks: any = await http.get(`${api.tracks}/${id}?access_token=${token}`);
      return dispatch({ type: "tracks/getTracks", payload: [...tracks] });
    } catch (e) {
      return dispatch({ type: "tracks/getTracks", payload: [] });
    }
}
};