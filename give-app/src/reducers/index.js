import {combineReducers} from 'redux';
import videoListReducer from './videoListReducer';
import selectedVideoReducer from './selectedVideoReducer';

export default combineReducers({
    videoList: videoListReducer,
    selectedVideo: selectedVideoReducer
});