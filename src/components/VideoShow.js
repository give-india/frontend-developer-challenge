import React, { Component } from "react";
import Youtube from "react-youtube";

export default class VideoShow extends Component {
  _onReady = e => {
    // access to player in all event handlers via event.target
    console.log(e.target);
    console.log(e.target.getDuration() / 60);
  };
  _onEnd = e => {};
  render() {
    const videoId = this.props.firstVideo[0].substring(32);
    // const videoSrc = `https://www.youtube.com/embed/${videoId}`;
    // console.log(this.myRef);
    const opts = {
      playerVars: {
        autoplay: 1
      }
    };
    return (
      <div className="ui embed">
        <Youtube
          videoId={videoId}
          opts={opts}
          onReady={this._onReady}
          onEnd={this._onEnd}
        />
        {/* <iframe
          ref={this.myRef}
          className="videoShowStyle"
          title="Video Player"
          src={videoSrc}
          allowFullScreen={true}
        /> */}
      </div>
    );
  }
}
