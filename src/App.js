import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import YouTube from 'react-youtube';

import './App.css';

// Custome Components
import InputForm from './components/InputForm';
import PlayList from './components/PlayList';

const cacheVideolist = localStorage.getItem("videoList") ? JSON.parse(localStorage.getItem("videoList")) : [];

const App = () => {

  // ***************** STATE
  const [videoList, setVideolist] = useState(cacheVideolist);
  const [youTubeUrl, setYouTubeUrl] = useState('');
  const [nowPlaying, setNowPlaying] = useState(videoList[0] || undefined);
  const [opts, setOpts] = useState({
    height: '390',
    width: '100%',
    playerVars: {
        autoplay: 1,
        start: 0
    }
})

  /**
   * Effect for setting now playing.
   */
  useEffect(() => {

    if(videoList.length !== 0) {
      if (videoList.length === 1) {
        setNowPlaying(videoList[0]);
      }

      // Only when nowPlaying is not undefined
      nowPlaying && nowPlaying.id !== videoList[0].id && setNowPlaying(videoList[0])
      localStorage.setItem("videoList", JSON.stringify(videoList));
    }
    else {
      setNowPlaying(undefined);
      localStorage.setItem("videoList", JSON.stringify([]));
    };
  }, [videoList]);

  /**
   * Effect for resetting start on videolist length change only for different video.
   */
  useEffect(() => {
    videoList[0] && nowPlaying && nowPlaying.id !== videoList[0].id &&
      setOpts({
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
            start: videoList[0].id % videoList[0].id
        }
    })

  }, [videoList.length])

  /**
   * Effect on cache change
   */

  // ***************** FUNCTIONALITY
  const handleDelete = (id) => {
    if (videoList.length > 0) {
      const tempVideoList = videoList.filter(video => video.id !== id);
      setVideolist(tempVideoList);
    }
  }

  const handleMove = (videoIndex, val) => {

    // mutable array swap
    let swapVideoList = videoList.map((video, index) => {
      if (val === -1) {
        if (index === videoIndex - 1) {
          let temp = videoList[videoIndex - 1];
          videoList[videoIndex - 1] = videoList[videoIndex];
          videoList[videoIndex] = temp;
        }
      } else if (val === 1) {
        if (index === videoIndex) {
          let temp = videoList[videoIndex];
          videoList[videoIndex] = videoList[videoIndex + 1];
          videoList[videoIndex + 1] = temp;
        }
      }
      
      return videoList[index];
    });
    
    setVideolist(swapVideoList);
  }

  const handleYoutubeUrl = (e) => {
    setYouTubeUrl(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let urlMatch = youTubeUrl.match(/^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/);
    if (urlMatch) {
      if ( urlMatch[2] === 'www.youtube.com' || urlMatch[2] === 'youtu.be') {
        let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        let match = youTubeUrl.match(regExp);
  
        if (match && match[2].length === 11) {
          
          const singleVideo = {
            id: uuid(),
            videoId: match[2], 
            videoLink: youTubeUrl
          }
  
          setVideolist([...videoList, singleVideo]);
          setYouTubeUrl('');
        }
      }
    } else {
      alert('Enter proper YouTube URL!');
    }
  } 

  return (
    <div className="App">
      <header><h1>YouTube Radio</h1></header>
      <main>
        <InputForm
          youTubeUrl={youTubeUrl}
          handleYoutubeUrl={handleYoutubeUrl}
          handleSubmit={handleSubmit}
        />
        <div className="player-playlist">
        {nowPlaying ? 
          <YouTube
              className="video"
              id={nowPlaying.id}
              videoId={nowPlaying.videoId}
              opts={opts}
              onEnd={() => handleDelete(nowPlaying.id)}
          /> 
          : <h1>Enter links to your fav songs above.</h1>}
        <PlayList
          videoList={videoList} 
          handleDelete={handleDelete}
          nowPlaying={nowPlaying}
          handleMove={handleMove}
        />
        </div>
      </main>
    </div>
  );
}

export default App;
