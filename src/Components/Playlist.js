import React from "react";
import ListItem from "./ListItem";

import { useSelector } from "react-redux";

const Playlist = () => {
	const links = useSelector(state => state.links);
	return (
		<div className="playlist-container">
			<div className="playlist-header">PlayList</div>
			<div className="mt-20">
				{links.map(link => {
					return <ListItem link={link} key={`Youtube ${link}`} />;
				})}
			</div>
		</div>
	);
};

export default Playlist;
