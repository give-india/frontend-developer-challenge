import React, { Component } from "react";

export default class VideoShow extends Component {
  render() {
    const videoId = this.props.firstVideo.substring(32);
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    return (
      <iframe
        className="videoShowStyle"
        title="Video Player"
        src={videoSrc}
        allowFullScreen={true}
      />
    );
  }
}
