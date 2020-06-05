import React from 'react';
import ReactDOM from 'react-dom';
import {throttle} from 'lodash';
import App from './components/App';
import reducers from './reducers';
import { loadState,saveState } from './localStorage';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let persistedState = loadState();
let store = createStore(reducers,persistedState);

store.subscribe(throttle(()=>{
    saveState(store.getState())},1000));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.querySelector('#root'));

