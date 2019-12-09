import React, { Component } from "react";

export default class VideoItem extends Component {
  onClickHandler = e => {
    console.log(this.props.video);
  };
  render() {
    console.log(this.props);
    return (
      <div className="ItemElemStyle">
        <p>{this.props.video}</p>
        <button onClick={this.onClickHandler}>X</button>
      </div>
    );
  }
}
