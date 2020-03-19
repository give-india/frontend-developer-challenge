import React from "react";
import YouTube from "react-youtube";

import { useSelector, useDispatch } from "react-redux";
import { SET_VIDEO_LINKS_LIST, SET_CURRENT_PLAYING_VIDEO } from "../actions";

const VideoPlayer = () => {
	const { links, currentPlayingVideo } = useSelector(state => state);
	const dispatch = useDispatch();

	const opts = {
		height: "500",
		width: "83%",
		playerVars: {
			autoplay: 1
		}
	};

	const handleVideoEnd = () => {
		let index = links.findIndex(link => link === currentPlayingVideo);
		let updatedList = links.filter(link => !(link === currentPlayingVideo));
		let updatedNowPlayingVideo =
			links.length === 1
				? ""
				: index === links.length - 1
				? links[0]
				: links[index + 1];
		dispatch({ type: SET_VIDEO_LINKS_LIST, payload: updatedList });
		dispatch({
			type: SET_CURRENT_PLAYING_VIDEO,
			payload: updatedNowPlayingVideo
		});
	};

	return (
		<div>
			{links.length ? (
				<YouTube
					videoId={currentPlayingVideo}
					opts={opts}
					onEnd={handleVideoEnd}
				/>
			) : (
				<p>No Links Added!!</p>
			)}
		</div>
	);
};

export default VideoPlayer;
