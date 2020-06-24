import React from 'react';

import TitleContainer from './components/TitleContianer';

import './App.css';

function App() {
  return (
    <div className="app">
      <div className="appTitle">Youtube Video Player</div>
      <div className="youtubePlayerContainer">
        <div className="playerContainer">
          <TitleContainer
            title='Player'
          />
        </div>
        <div className="playlistContainer">
          <TitleContainer
            title='Playlist'
          />
        </div>
      </div>
    </div>
  );
}

export default App;