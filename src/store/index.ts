import { applyMiddleware, createStore } from 'redux';
import {
  createStateSyncMiddleware,
  initStateWithPrevTab
} from 'redux-state-sync';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const config = {};
const middlewares = [createStateSyncMiddleware(config), thunk];

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));
initStateWithPrevTab(store);

export default store;
