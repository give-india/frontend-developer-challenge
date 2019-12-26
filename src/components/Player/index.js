import React, { Fragment } from 'react';
import YouTubePlayer from 'react-youtube';
import SongsListContext from '../SongsListContext';
import ContextWrapper from '../ContextWrapper';

const Player = props => {
  const { youtubePlyrId, localData, setYoutubePlyrId } = props;
  let lastStateChangeTime = 0;
  const videoId = youtubePlyrId.id;
  const { data } = props;

  const onReady = event => {
    const youtubePlayerRef = event.target;
    const currentVideoDetails = localData.currentVideoDetailsJson;
    if (
      currentVideoDetails &&
      currentVideoDetails.youId &&
      youtubePlyrId !== currentVideoDetails.youId &&
      currentVideoDetails.pauseTime !== youtubePlayerRef.getCurrentTime()
    ) {
      youtubePlayerRef.seekTo(currentVideoDetails.pauseTime);
      youtubePlayerRef.pauseVideo();
    }
  };

  const onStateChange = event => {
    // access to player in all event handlers via event.target
    const youtubePlayerRef = event.target;
    if (
      youtubePlayerRef &&
      lastStateChangeTime !== youtubePlayerRef.getCurrentTime()
    ) {
      let currentVideoDetails = localData.currentVideoDetailsJson;
      if (
        currentVideoDetails &&
        youtubePlyrId !== currentVideoDetails.youId &&
        currentVideoDetails.pauseTime !== youtubePlayerRef.getCurrentTime()
      ) {
        try {
          localStorage.setItem(
            'currentVideoDetails',
            JSON.stringify({
              youId: youtubePlyrId.id,
              key: youtubePlyrId.id.key,
              pauseTime: youtubePlayerRef.getCurrentTime(),
            })
          );
        } catch (ex) {
          console.log(ex);
        }
      }
    }
  };

  const onEnd = event => {
    const youtubePlayerRef = event.target;
    const copySongsList = [...data.songsList];
    copySongsList.splice(youtubePlyrId.key, 1);
    data.updateList(copySongsList);
    if (copySongsList.length < 1) {
      alert('Song list is empty');
    } else {
      alert('Next video playing');
    }
    setYoutubePlyrId({
      id: copySongsList[youtubePlyrId.key],
      key: youtubePlyrId.key,
    });
    youtubePlayerRef.playVideo();
    localStorage.setItem(
      'currentVideoDetails',
      '{youId: null, pauseTime: null}'
    );
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const ytprops = {
    videoId,
    opts,
    onReady,
    onStateChange,
    onEnd,
  };

  const renderYoutubePlayer = () => {
    if (!youtubePlyrId.id) {
      return <p className="no-video">No video available</p>;
    }

    return (
      <Fragment>
        <YouTubePlayer {...ytprops} />
      </Fragment>
    );
  };

  return <div className="add-section">{renderYoutubePlayer()}</div>;
};

export default ContextWrapper(SongsListContext)(Player);
