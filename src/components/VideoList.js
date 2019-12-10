import React, { Component } from "react";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
//import VideoItem from "./VideoItem";

export default class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
      crossVideoId: ""
    };
  }
  onClickHandler = id => {
    this.setState(
      {
        crossVideoId: id
      },
      () => this.props.crossHandler(this.state.crossVideoId)
    );
  };

  itemRenderer = (item, index) => {
    return (
      <div className="video-item item">
        <div className="content">
          <p className="header">{item.video}</p>
          <button
            className="ui secondary basic button"
            onClick={() => this.onClickHandler(item.id)}
          >
            X
          </button>
        </div>
      </div>
    );
  };
  handleRLDDChange = reorderedItems => {
    this.setState({ videoList: reorderedItems }, () =>
      this.props.orderChange(this.state.videoList)
    );
  };

  render() {
    //console.log(this.props);
    return (
      <div className="ui relaxed divided list">
        <h3>Playlist</h3>
        <RLDD
          items={this.props.videoArr}
          itemRenderer={this.itemRenderer}
          onChange={this.handleRLDDChange}
        />
      </div>
    );
  }
}

// {this.props.videoArr.map((video, index) => (
//   <VideoItem
//     key={index}
//     video={video}
//     crossHandler={this.crossHandler}
//   />
// ))}
