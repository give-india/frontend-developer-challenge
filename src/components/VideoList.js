import React, { Component } from "react";
import VideoItem from "./VideoItem";

export default class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
      crossVideo: ""
    };
  }

  crossHandler = video => {
    this.setState(
      {
        crossVideo: video
      },
      () => this.props.crossHandler(this.state.crossVideo)
    );
  };

  render() {
    //console.log(this.props);
    return (
      <div className="ui relaxed divided list">
        <h3>Playlist</h3>
        {this.props.videoArr.map((video, index) => (
          <VideoItem
            key={index}
            video={video}
            crossHandler={this.crossHandler}
          />
        ))}
      </div>
    );
  }
}
