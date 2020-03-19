import React from "react";
import ListItem from "./ListItem";

const Playlist = () => {
	return (
		<div className="playlist-container">
			<div className="playlist-header">PlayList</div>
			<div className="mt-20">
				{["", "", ""].map(item => {
					return <ListItem />;
				})}
			</div>
		</div>
	);
};

export default Playlist;
