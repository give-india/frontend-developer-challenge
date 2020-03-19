import React from "react";
import { Provider } from "react-redux";
import { toast } from "react-toastify";

import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import store from "./store";

import InputBox from "./Components/InputBox";
import VideoPlayer from "./Components/VideoPlayer";
import Playlist from "./Components/Playlist";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

toast.configure();

function App() {
	return (
		<div className="d-flex app-container">
			<Provider store={store}>
				<div className="d-flex flex-column w-85">
					<InputBox />
					<VideoPlayer />
				</div>
				<DndProvider backend={Backend}>
					<Playlist />
				</DndProvider>
			</Provider>
		</div>
	);
}

export default App;
