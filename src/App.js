import React from 'react';
import { connect } from "react-redux";

import * as actions from './store/actions';
import TitleContainer from './components/TitleContianer';
import Playlist from './components/Playlist';
import Player from './components/Player';

import './App.css';

const App = ({
  activeItem,
  removeActiveLinkData
}) => {
  const videoEndedHandler = () => {
    removeActiveLinkData(activeItem)
  }

  return (
    <div className="app">
      <div className="appTitle">Youtube Video Player</div>
      <div className="youtubePlayerContainer">
        <div className="playerContainer">
          <TitleContainer
            title='Player'
          />
          <Player 
            activeItem={activeItem}
            videoEndedHandler={videoEndedHandler}
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
  activeItem: state.playlist.activeItem
})

const mapStateToDispatch = dispatch => ({
  removeActiveLinkData: (data) => dispatch(actions.removeLinkDispatch(data))
})

export default connect(mapStateToProps, mapStateToDispatch)(App);