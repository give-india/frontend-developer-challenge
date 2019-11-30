import { applyMiddleware, createStore } from "redux";
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import axios from 'axios';

axios.defaults.withCredentials = true;

const config = {
    // TOGGLE_TODO will not be triggered in other tabs
    blacklist: ['TOGGLE_TODO'],
  }

const middlewares = [
    createStateSyncMiddleware(config),
    thunk.withExtraArgument(axios)
  ];

const middleware = applyMiddleware(...middlewares);


const store = createStore(rootReducer, composeWithDevTools(middleware));

// init state with other tabs
initStateWithPrevTab(store)
export default store;