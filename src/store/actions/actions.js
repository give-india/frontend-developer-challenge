import * as ACTION_TYPES from './action_types';

export const add_to_playlist = (text) => {
	return {
		type: ACTION_TYPES.ADD_TO_PLAYLIST,
		payload: text
	}
}

export const clear_playlist = () => {
	return {
		type: ACTION_TYPES.CLEAR_PLAYLIST
	}
}

export const remove_from_playlist = (text) => {
	return {
		type: ACTION_TYPES.REMOVE_FROM_PLAYLIST,
		payload:text
	}
}

export const set_current_track = (track) =>{
    return{
        type:ACTION_TYPES.SET_CURRENT_TRACK,
        payload:track
    }
}