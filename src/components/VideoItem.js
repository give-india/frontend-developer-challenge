import React, { Component } from "react";

export default class VideoItem extends Component {
  onClickHandler = () => {
    this.props.crossHandler(this.props.video);
  };
  render() {
    //console.log(this.props);
    return (
      <div className="video-item item">
        <div className="content">
          <p className="header">{this.props.video}</p>
          <button
            className="ui secondary basic button"
            onClick={this.onClickHandler}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}
