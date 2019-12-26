import React, { useRef } from 'react';
import SongsListContext from '../SongsListContext';
import ContextWrapper from '../ContextWrapper';

const AddLink = props => {
  const { data } = props;
  const songInputField = useRef(null);

  const getYoutubeKeyFromUrl = newUrl => {
    let url = new URL(newUrl);
    let key = url.searchParams.get('v');
    return key;
  };

  const matchYoutubeUrl = url => {
    // regex is not part of my custom code
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  };

  const addNewlink = (e, updateNewList, songsOldList, addUrl) => {
    let newSongsList = songsOldList.length > 0 ? songsOldList : [];
    const youtubeUrl = songInputField.current.value;
    songInputField.current.style.color = '#fff';
    if (addUrl || e.keyCode === 13) {
      const songsCount = newSongsList.length;
      if (
        !matchYoutubeUrl(youtubeUrl) ||
        getYoutubeKeyFromUrl(youtubeUrl).length > 11
      ) {
        songInputField.current.style.color = 'red';
        return false;
      }
      newSongsList[songsCount] = getYoutubeKeyFromUrl(youtubeUrl);
      if (newSongsList && songsCount > 0) {
        updateNewList(newSongsList);
      } else {
        updateNewList(newSongsList);
      }
      songInputField.current.value = '';
      alert('Link added!');
    }

    return false;
  };

  return (
    <div className="link-add-header">
      <input
        type="text"
        className=""
        placeholder="Add a youtube link (eg. https://www.youtube.com/watch?v=WYnSEW4sXrk)"
        onKeyDown={e => addNewlink(e, data.updateList, data.songsList)}
        ref={songInputField}
      />
      <button
        type="button"
        className="add-btn"
        onClick={() => addNewlink({}, data.updateList, data.songsList, true)}
      >
        Add song
      </button>
    </div>
  );
};

export default ContextWrapper(SongsListContext)(AddLink);
