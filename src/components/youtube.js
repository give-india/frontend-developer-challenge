import React from 'react';
import ReactPlayer from 'react-player';

const YoutubeVideo = ({ list = [], updateList }) => {
  const removeVideo = () => {
    list.shift();
    updateList(list);
  }
  return(
    <div className="video-wrapper">
      {list.length > 0
        ? <ReactPlayer url={list[0]}
            width="100%"
            height="90vh"
            playing
            controls
            onEnded={removeVideo}/>
        : <p>Video not availble</p>
      }
    </div>
  );
}

export default YoutubeVideo;
