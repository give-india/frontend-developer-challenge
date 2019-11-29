import { combineReducers } from "redux";
import PlaySongsReducer from "./PlaySongsReducer.js";

const rootReducer = combineReducers({
  songsData: PlaySongsReducer
});

export default rootReducer;
