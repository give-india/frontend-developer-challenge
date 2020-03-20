import { withReduxStateSync } from "redux-state-sync";

import { SET_VIDEO_LINKS_LIST, SET_CURRENT_PLAYING_VIDEO } from "../actions";

const initialState = {
	links: [],
	currentPlayingVideo: ""
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_VIDEO_LINKS_LIST:
			return { ...state, links: action.payload };
		case SET_CURRENT_PLAYING_VIDEO:
			return { ...state, currentPlayingVideo: action.payload };
		default:
			return state;
	}
};

export default withReduxStateSync(rootReducer);
