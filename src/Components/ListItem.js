import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_VIDEO_LINKS_LIST, SET_CURRENT_PLAYING_VIDEO } from "../actions";

const ListItem = ({ link }) => {
	const links = useSelector(state => state.links);
	const dispatch = useDispatch();

	const handleRemoveLink = () => {
		const updatedList = links.filter(item => !(link === item));
		dispatch({ type: SET_VIDEO_LINKS_LIST, payload: updatedList });
	};

	const handleChangePlayingVideo = () => {
		dispatch({ type: SET_CURRENT_PLAYING_VIDEO, payload: link });
	};

	return (
		<div className="list-item">
			<span onClick={handleChangePlayingVideo}>{link}</span>
			<button onClick={handleRemoveLink}>Remove</button>
		</div>
	);
};

export default ListItem;
