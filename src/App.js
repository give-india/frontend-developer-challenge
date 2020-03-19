import React from "react";
import InputBox from "./Conponents/InputBox";
import VideoPlayer from "./Conponents/VideoPlayer";
import Playlist from "./Conponents/Playlist";

import "./App.css";

function App() {
	return (
		<div className="d-flex app-container">
			<div className="d-flex flex-column w-85">
				<InputBox />
				<VideoPlayer />
			</div>
			<Playlist />
		</div>
	);
}

export default App;
