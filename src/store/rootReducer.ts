import { combineReducers } from "redux";
import PlayerListReducer from "containers/VideoPlaylistContainer/Reducer";
import AddVideoReducer from "containers/AddVideoContainer/Reducer";

export default combineReducers({
  playerlist: PlayerListReducer,
  addVideo: AddVideoReducer
});
