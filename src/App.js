import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import YoutubePlayer from '../src/YoutubeList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={YoutubePlayer} />
      </div>
    );
  }
}

export default App;
