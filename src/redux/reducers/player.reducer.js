import actionTypes from "../constants/actions.types";
import * as utils from "../utils/utility";

const INITIAL_STATE = {
  playlist: [],
  error: ""
  //loader: false
};

const PlayerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAYLIST:
      return { ...state, playlist: action.playlist };
    case actionTypes.ADD_VIDEO:
      return utils.addVideoToplayList(state, action.song_id, action.title);
    case actionTypes.MOVE_UP:
      return utils.moveVideoUp(state, action.song_id);
    case actionTypes.MOVE_DOWN:
      return utils.moveVideoDown(state, action.song_id);
    case actionTypes.REMOVE_VIDEO:
      const updatedPlayList = utils.deleteVideoFromPlayList(
        state.playlist,
        action.song_id
      );
      return { ...state, playlist: [...updatedPlayList] };
    case actionTypes.VIDEO_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default PlayerReducer;
