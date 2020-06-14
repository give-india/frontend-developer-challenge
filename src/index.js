import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './Store/Reducer/Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = (store) => {
  return (next) =>{
     return (action) =>{
         console.log('[Middleware] Dispatching', action);
         const result = next(action);
         console.log('[Middleware] next state', store.getState());
         return result;
     }
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger)));

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}> <App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
