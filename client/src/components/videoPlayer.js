import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({tracks, onDelete}) {
  let videoUrl;
  if (tracks.length !== 0) {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    let check = tracks[0].url.match (regExp);
    videoUrl = 'https://www.youtube.com/embed/' + check[2];
  }

  return (
    <div className="videoplayer-container">
      {tracks.length === 0
        ? <div>Add some tracks to play.</div>
        : <ReactPlayer
            url={videoUrl}
            playing={true}
            controls
            onEnded={() => onDelete (tracks[0].id)}
          />}
    </div>
  );
}

export default VideoPlayer;
