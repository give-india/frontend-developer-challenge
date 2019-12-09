import React, { Component } from "react";

export default class VideoShow extends Component {
  componentDidMount() {
    console.log(this);
  }
  render() {
    const videoId = this.props.firstVideo.substring(32);
    const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    return (
      <div className="ui embed">
        <iframe
          id="ik_player_iframe"
          className="videoShowStyle"
          title="Video Player"
          src={videoSrc}
          allowFullScreen={true}
        />
      </div>
    );
  }
}
