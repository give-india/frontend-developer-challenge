import {combineReducers} from 'redux';

import tracks from './trackReducer';

const rootReducer = combineReducers ({
  tracks,
});

export default rootReducer;
