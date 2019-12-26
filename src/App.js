import React, { useState, useEffect, Fragment } from 'react';
import SongList from './components/SongList';
import AddLink from './components/AddLink';
import SongsListContext from './components/SongsListContext';
import Player from './components/Player';

import getLocalData from './components/helper.js';

import './App.scss';

const App = () => {
  const [songsList, setSongsList] = useState([]);
  const [youtubePlyrId, setYoutubePlyrId] = useState('');
  const [localData, setlocalData] = useState({
    songsList: [],
    currentVideoDetailsJson: {},
  });

  const updateList = val => {
    try {
      localStorage.setItem('songsList', JSON.stringify(val));
      setSongsList([...val]);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    //runs once, initially
    setlocalData(getLocalData());
  }, []);

  useEffect(() => {
    // initialize after setlocalData is called
    let currentVideoDetails = localData.currentVideoDetailsJson;
    if (
      currentVideoDetails &&
      currentVideoDetails.youId &&
      currentVideoDetails.pauseTime
    ) {
      setYoutubePlyrId({
        id: currentVideoDetails.youId,
        key: currentVideoDetails.key,
      });
    }
    if (localData.songsList && localData.songsList.length > 0) {
      setSongsList(localData.songsList);
    }
  }, [localData]);

  return (
    <div className="App">
      <SongsListContext.Provider value={{ songsList, updateList }}>
        <AddLink />
        <Player
          youtubePlyrId={youtubePlyrId}
          localData={localData}
          setYoutubePlyrId={setYoutubePlyrId}
        />
        <SongList name="Playlist" setYoutubePlyrId={setYoutubePlyrId} />
      </SongsListContext.Provider>
    </div>
  );
};

export default App;
