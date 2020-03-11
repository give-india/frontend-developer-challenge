import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux'
import store from "./redux/store"
const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>  
  </React.StrictMode>,
  rootElement
);
