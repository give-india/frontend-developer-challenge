import React, { Component, Fragment } from "react";
import Youtube from "react-youtube";

export default class VideoShow extends Component {
  _onEnd = e => {
    const remVideoArr = [...this.props.firstVideo];
    remVideoArr.shift();
    this.props.videoCompleteHandler(remVideoArr);
  };
  render() {
    let videoId;
    if (this.props.firstVideo.length > 0) {
      videoId = this.props.firstVideo[0].substring(32);
    }
    const opts = {
      playerVars: {
        autoplay: 1
      }
    };
    if (this.props.firstVideo.length > 0) {
      return (
        <Fragment>
          <div className="ui embed">
            <Youtube videoId={videoId} opts={opts} onEnd={this._onEnd} />
          </div>
          <div className="ui segment">
            <h4 className="ui header">{this.props.firstVideo[0]}</h4>
          </div>
        </Fragment>
      );
    } else {
      return <div className="ui embed">Add videos to show</div>;
    }
  }
}
