import React from 'react';
import { connect } from "react-redux";

import TitleContainer from './components/TitleContianer';
import Playlist from './components/Playlist';

import './App.css';

const App = () => {
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
          <Playlist />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({

})

const mapStateToDispatch = dispatch => ({

})

export default connect(mapStateToProps, mapStateToDispatch)(App);