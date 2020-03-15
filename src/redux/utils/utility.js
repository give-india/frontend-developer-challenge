export const addVideoToplayList = (state, song_id, song_title) => {
  const foundItem = state.playlist.filter(elem => {
    return Object.keys(elem)[0] === song_id;
  });
  if (foundItem.length === 0) {
    const newPlayList = [...state.playlist, { [song_id]: song_title }];
    localStorage.setItem("playlist", JSON.stringify(newPlayList));
    return {
      ...state,
      playlist: newPlayList
    };
  } else {
    return { ...state, error: "Already Exists" };
  }
};

export const moveVideoUp = (state, song_index) => {
  let array = [...state.playlist];
  let temp = array[song_index - 1];
  array[song_index - 1] = array[song_index];
  array[song_index] = temp;
  localStorage.setItem("playlist", JSON.stringify(array));
  return { ...state, playlist: [...array] };
};

export const moveVideoDown = (state, song_index) => {
  let array_down = [...state.playlist];
  let temp1 = array_down[song_index + 1];
  array_down[song_index + 1] = array_down[song_index];
  array_down[song_index] = temp1;
  localStorage.setItem("playlist", JSON.stringify(array_down));
  return { ...state, playlist: [...array_down] };
};

export const deleteVideoFromPlayList = (playlist, song_index) => {
  let updatedPlayList = "";
  if (song_index === 0 && playlist.length > 0) {
    playlist.shift();
    updatedPlayList = playlist;
  } else {
    updatedPlayList = playlist.filter((elem, index) => {
      return index !== song_index;
    });
  }
  localStorage.setItem("playlist", JSON.stringify(updatedPlayList));
  return updatedPlayList;
};
