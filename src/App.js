import React, { Component } from 'react';
import YoutubePlayer from '../src/YoutubeList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <YoutubePlayer/>
      </div>
    );
  }
}

export default App;
