import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import YouTube from 'react-youtube';
//import "./video.css"

const YoutubeEmbed = ({ videoId, playNext }) => {
  const opts = {
    height: '400',
    width: '873',
  };

  const _onEnd = () => {
    console.log("video ended")
    playNext();
  }

  return(
    <div className="video-responsive">
      {/* <iframe
        width="873"
        height="400"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      /> */}
      <YouTube id="youtube" key={videoId} opts={opts} videoId={videoId} onEnd={_onEnd} />
    </div>
  )
};

// YoutubeEmbed.propTypes = {
//   embedId: PropTypes.string.isRequired
// };

export default YoutubeEmbed;