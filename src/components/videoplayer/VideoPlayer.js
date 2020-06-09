import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { observer, inject } from 'mobx-react';
// import './VideoPlayer.css';

class VideoPlayer extends Component {
  VideoOnReady = (event) => {
    event.target.playVideo();
    // console.log(event.target);
    // console.log(event.target.getVideoData());
  };

  VideoOnEnd = (event) => {
    this.props.StateStore.removeId();
  };

  render() {
    const { StateStore } = this.props;
    const w = Math.ceil(((window.innerWidth * (7 / 12)) / 100) * 100) - 50;
    const h = Math.ceil(((w * (9 / 16)) / 100) * 100);

    const opts = {
      height: `${h}`,
      width: `${w}`,
      playerVars: {
        autoplay: 1,
      },
    };

    return (
      <YouTube
        videoId={StateStore.videoId[0]}
        opts={opts}
        onReady={this.VideoOnReady}
        onEnd={this.VideoOnEnd}
      />
    );
  }
}

export default inject('StateStore')(observer(VideoPlayer));
