import {createStore} from 'redux';

import {loadState, saveState} from './localStorage';

import rootReducer from './reducers/rootReducer';

const presistedState = loadState ();

const store = createStore (rootReducer, presistedState);

store.subscribe (() => {
  saveState (store.getState ());
});

export default store;
