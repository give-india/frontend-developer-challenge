import React from 'react';
import {AddTrackHOC, TrackListHOC, VideoPlayerHOC} from './containers';

function App () {
  return (
    <div className="App">
      <div className="title">Radio App</div>
      <AddTrackHOC />
      <div className="divider">
        <VideoPlayerHOC />
        <TrackListHOC />
      </div>
    </div>
  );
}

export default App;
