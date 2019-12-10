import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoShow from "./components/VideoShow";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullLink: "",
      videoArr: ["https://www.youtube.com/watch?v=imjq5yQzNiI"],
      selected: "",
      crossVideo: ""
    };
  }
  submitHandler = videoLink => {
    this.setState(
      {
        fullLink: videoLink,
        videoArr: [videoLink, ...this.state.videoArr]
      },
      () =>
        this.setState({
          selected: this.state.videoArr[0]
        })
    );
  };

  crossHandler = crossVideo => {
    //console.log(video);
    //const newArray = [...this.state.videoArr];
    const newArr = this.state.videoArr.filter(line => line !== crossVideo);
    this.setState({
      videoArr: newArr
    });
  };

  videoCompleteHandler = () => {};

  render() {
    return (
      <div className="ui container">
        <h1>Youtube Playlist</h1>
        <SearchBar submitHandler={this.submitHandler} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoShow
                firstVideo={this.state.videoArr}
                videoCompleteHandler={this.videoCompleteHandler}
              />
            </div>
            <div className="five wide column">
              <VideoList
                className="videoArrStyle"
                videoArr={this.state.videoArr}
                crossHandler={this.crossHandler}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
