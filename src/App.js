import React from "react";
import { Provider } from "react-redux";
import VideoPlayer from "./Conponents/VideoPlayer";
import Playlist from "./Conponents/Playlist";
import store from "./store";

import "./App.css";

function App() {
	return (
		<div className="d-flex app-container">
			<Provider store={store}>
				<div className="d-flex flex-column w-85">
					<InputBox />
					<VideoPlayer />
				</div>
				<Playlist />
			</Provider>
		</div>
	);
}

export default App;
