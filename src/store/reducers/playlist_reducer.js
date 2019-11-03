import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
    playlist: [],
    current_track:null
}

const PlaylistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_TO_PLAYLIST:
            localStorage.setItem('playlist', action.payload);
            return {
                ...state,
                playlist: action.payload
            }
        case ACTION_TYPES.CLEAR_PLAYLIST:
            localStorage.removeItem('playlist');
            return {
                ...state,
                playlist: []
            }
        case ACTION_TYPES.REMOVE_FROM_PLAYLIST:
            localStorage.setItem('playlist', action.payload);
            return {
                ...state,
                playlist: action.payload
            }
        case ACTION_TYPES.SET_CURRENT_TRACK:
            localStorage.setItem('current_track', action.payload);
            return {
                ...state,
                current_track:action.payload
            }
        default:
            return state
    }
}

export default PlaylistReducer;