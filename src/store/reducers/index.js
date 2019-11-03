import PlaylistReducer from './playlist_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    playlist_reducer: PlaylistReducer,
})

export default rootReducer;
