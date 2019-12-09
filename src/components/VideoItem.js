import React, { Component } from "react";

export default class VideoItem extends Component {
  onClickHandler = e => {
    console.log(this.props.video);
  };
  render() {
    console.log(this.props);
    return (
      <div className="video-item item">
        <div className="content">
          <p className="header">{this.props.video}</p>
          <button className="ui secondary button" onClick={this.onClickHandler}>
            X
          </button>
        </div>
      </div>
    );
  }
}
