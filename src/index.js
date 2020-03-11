import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import App from "./App";
import { Provider } from 'react-redux'
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
import reducer from "./redux/reducer"

const config = {}
const middlewares = [
  createStateSyncMiddleware(config),
]

const store = createStore(reducer, applyMiddleware(...middlewares));

initStateWithPrevTab(store)

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>  
  </React.StrictMode>,
  rootElement
);
