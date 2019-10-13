import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { videoDataReducer } from "./videoDataReducer";

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  videoDataReducer
});

export default rootReducer;