import React from "react";
import YouTube from "react-youtube";

const VideoPlayer = () => {
	const opts = {
		height: "500",
		width: "83%",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1
		}
	};

	const onReady = event => {
		// access to player in all event handlers via event.target
		// event.target.pa/useVideo();
	};

	return <YouTube videoId="" opts={opts} onReady={onReady} />;
};

export default VideoPlayer;
