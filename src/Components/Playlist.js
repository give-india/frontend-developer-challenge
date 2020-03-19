import React, { useCallback } from "react";
import update from "immutability-helper";

import ListItem from "./ListItem";

import { useSelector, useDispatch } from "react-redux";
import { SET_VIDEO_LINKS_LIST } from "../actions";

const Playlist = () => {
	const links = useSelector(state => state.links);
	const dispatch = useDispatch();
	const linksCopy = links;
	const moveLink = useCallback(
		(dragIndex, hoverIndex) => {
			const dragCard = linksCopy[dragIndex];
			dispatch({
				type: SET_VIDEO_LINKS_LIST,
				payload: update(links, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragCard]
					]
				})
			});
		},
		[links]
	);
	return (
		<div className="playlist-container">
			<div className="playlist-header">PlayList</div>
			<div className="mt-20">
				{links.map((link, index) => {
					return (
						<ListItem
							link={link.link}
							key={link.id}
							index={index}
							id={link.id}
							moveCard={moveLink}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Playlist;
