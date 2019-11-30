import { combineReducers } from "redux";
import { withReduxStateSync } from 'redux-state-sync'
import PlaySongsReducer from "./PlaySongsReducer.js";

const rootReducer = combineReducers({
  songsData: PlaySongsReducer
});

export default withReduxStateSync(rootReducer)
