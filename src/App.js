import React from "react";
import MainContainer from "./container/mainContainer";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h2 className="heading-primary">YouTube Video Player</h2>
      <Provider store={store}>
        <MainContainer />
      </Provider>
    </div>
  );
}

export default App;
