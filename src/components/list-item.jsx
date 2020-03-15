import React from "react";
import Button from "./button";
import { connect } from "react-redux";
import { moveUp, moveDown, removeVideo } from "../redux/actions/player.actions";

const ListItem = ({
  index,
  playlist,
  moveUp,
  moveDown,
  title,
  deleteSongAtIndex
}) => {
  const handleMoveDown = () => {
    moveDown(index);
  };

  const handleMoveUp = () => {
    moveUp(index);
  };

  const handleDelete = () => {
    deleteSongAtIndex(index);
  };

  const length = playlist.length;
  return (
    <div className={`list-item${index === 0 ? "-first" : ""}`}>
      <span className="list-title">{`${index + 1}. ${title}`}</span>
      <div>
        {index !== 0 ? (
          <Button handleChange={handleMoveUp}>&#x2191;</Button>
        ) : null}
        {index !== length - 1 ? (
          <Button handleChange={handleMoveDown}>&#x2193;</Button>
        ) : null}
        <Button handleChange={handleDelete}>Remove</Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  moveUp: song_id => dispatch(moveUp(song_id)),
  moveDown: song_id => dispatch(moveDown(song_id)),
  deleteSongAtIndex: song_id => dispatch(removeVideo(song_id))
});

const mapStateToProps = state => ({
  playlist: state.playlist
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
