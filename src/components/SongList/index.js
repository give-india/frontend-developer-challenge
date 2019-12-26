import React from 'react';
import Reorder, { reorder } from 'react-reorder';
import SongsListContext from '../SongsListContext';
import ContextWrapper from '../ContextWrapper';

const SongList = props => {
  const { data } = props;
  let updateListSongs,
    mySongsList = [];

  const removeTheLink = (key, updateList, oldList) => {
    const oldListCopy = [...oldList];
    oldListCopy.splice(key, 1);
    updateList(oldListCopy);
  };

  const onReorder = (event, previousIndex, nextIndex) => {
    updateListSongs(reorder(mySongsList, previousIndex, nextIndex));
  };

  const renderList = (songsList, updateList) => {
    mySongsList = songsList;
    updateListSongs = updateList;

    return (
      <Reorder
        reorderId="my-list" // Unique ID that is used internally to track this list (required)
        reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
        component="ul" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
        componentClassName="link-list"
        placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
        draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
        lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
        holdTime={300} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
        touchHoldTime={300} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
        mouseHoldTime={100} // Hold time before dragging begins with mouse (optional), defaults to holdTime
        onReorder={onReorder} // Callback when an item is dropped (you will need this to update your state)
        autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
        disabled={false} // Disable reordering (optional), defaults to false
        disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
        placeholder={
          <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
        }
      >
        {songsList.map((ele, i) => {
          return (
            <li key={i}>
              <span
                className="you-link"
                onClick={() => props.setYoutubePlyrId({ id: ele, key: i })}
              >
                {`${i + 1}. https://www.youtube.com/watch?v=${ele}`}
              </span>
              <span
                className="remove-us"
                onClick={() => removeTheLink(ele, updateList, songsList)}
              >
                X
              </span>
            </li>
          );
        })}
      </Reorder>
    );
  };

  return (
    <div className="links-section">
      <h3>{props.name}</h3>
      {renderList(data.songsList, data.updateList)}
    </div>
  );
};

export default ContextWrapper(SongsListContext)(SongList);
