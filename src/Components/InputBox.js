import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./styles.css";
import { SET_VIDEO_LINKS_LIST, SET_CURRENT_PLAYING_VIDEO } from "../actions";

const isValidYoutubeLink = link => {
	let re = /^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/g;
	return re.test(link);
};

const getVideoId = input => {
	let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	let match = input.match(regExp);
	if (match && match[2].length == 11) {
		return match[2];
	} else {
		//error
	}
};

const InputBox = () => {
	const links = useSelector(state => state.links);
	const dispatch = useDispatch();

	const inputRef = useRef();

	const handleKeyPress = event => {
		if (event.which === 13 || event.keyCode === 13) {
			handleAddLink();
			return false;
		}
		return true;
	};

	const checkLinkAlreadyInList = input => {
		return links.findIndex(link => link.link === input) !== -1;
	};

	const handleAddLink = () => {
		const input = inputRef.current.value;
		const vidId = getVideoId(input);
		if (isValidYoutubeLink(input)) {
			if (!checkLinkAlreadyInList(vidId)) {
				if (!links.length) {
					dispatch({
						type: SET_CURRENT_PLAYING_VIDEO,
						payload: vidId
					});
				}
				dispatch({
					type: SET_VIDEO_LINKS_LIST,
					payload: [...links, { link: vidId, id: `Link ${vidId}` }]
				});
				toast.success("Link added successfully");
				inputRef.current.value = "";
			} else {
				toast.error("Link already exists in list.");
			}
		} else {
			toast.error("Please enter a valid YouTube video link!");
		}
	};

	return (
		<div className="mb-50">
			<input
				type="text"
				className="add-link-input-field"
				placeholder="Enter a YouTube video link"
				ref={inputRef}
				onKeyPress={handleKeyPress}
			/>
			<button className="add-link-button" onClick={handleAddLink}>
				Add Link
			</button>
		</div>
	);
};

export default InputBox;
