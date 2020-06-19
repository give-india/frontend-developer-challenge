import React from "react";
import ReactPlayer from "react-player";
import "./vp.css";
const Videoplayer = ({ urls, oncustomRemover }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={urls}
        controls={true}
        onEnded={() => oncustomRemover()}
      />
    </div>
  );
};

export default Videoplayer;
