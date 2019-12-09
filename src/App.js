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
      videoArr: ["https://www.youtube.com/watch?v=imjq5yQzNiI"]
    };
  }
  submitHandler = videoLink => {
    this.setState(
      {
        fullLink: videoLink,
        videoArr: [videoLink, ...this.state.videoArr]
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div className="ui container">
        <h1>Youtube Playlist</h1>
        <SearchBar submitHandler={this.submitHandler} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoShow firstVideo={this.state.videoArr[0]} />
            </div>
            <div className="five wide column">
              <VideoList
                className="videoArrStyle"
                videoArr={this.state.videoArr}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
