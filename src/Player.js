import React from "react";
import YouTube from 'react-youtube';

export default function Player({video, handleVideoEnd}) {
  const opts = {
    height: '390',
    width: '600',
    playerVars: {
      autoplay: 1
    }
  };
  
  function _onReady(event) {
    event.target.pauseVideo();
  }

  function _onEnd(event) {
    handleVideoEnd(video.id);
  }

  return (
      <YouTube
        videoId={video.link}
        opts={opts}
        onReady={_onReady}
        onEnd= {_onEnd}
      />
  );
}
