import React from "react";
import { Provider } from "react-redux";
import createStore from "store";
import "./App.scss";
import { VideoPlaylistContainer, AddVideoContainer } from "containers";
import { init } from "utils";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = createStore();

init();
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <AddVideoContainer />
          <VideoPlaylistContainer />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
