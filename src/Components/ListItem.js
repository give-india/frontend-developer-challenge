import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { SET_VIDEO_LINKS_LIST, SET_CURRENT_PLAYING_VIDEO } from "../actions";

const ListItem = ({ link, id, index, moveLink }) => {
	const ref = useRef(null);

	const links = useSelector(state => state.links);
	const dispatch = useDispatch();

	const handleRemoveLink = () => {
		let index = links.findIndex(linkData => linkData.link === link);
		let updatedList = links.filter(linkData => !(linkData.link === link));
		let updatedNowPlayingVideo =
			links.length === 1
				? ""
				: index === links.length - 1
				? links[0].link
				: links[index + 1].link;
		dispatch({ type: SET_VIDEO_LINKS_LIST, payload: updatedList });
		dispatch({
			type: SET_CURRENT_PLAYING_VIDEO,
			payload: updatedNowPlayingVideo
		});
	};

	const handleChangePlayingVideo = () => {
		dispatch({ type: SET_CURRENT_PLAYING_VIDEO, payload: link });
	};

	const [, drop] = useDrop({
		accept: "card",
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveLink(dragIndex, hoverIndex);
			item.index = hoverIndex;
		}
	});

	const [{ isDragging }, drag] = useDrag({
		item: { type: "card", id, index },
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<div className="list-item" ref={ref} style={{ opacity }}>
			<span onClick={handleChangePlayingVideo}>{link}</span>
			<button onClick={handleRemoveLink}>Remove</button>
		</div>
	);
};

export default ListItem;
