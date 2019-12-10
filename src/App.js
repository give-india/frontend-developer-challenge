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
      videoArr: [
        // { id: 1, video: "https://www.youtube.com/watch?v=imjq5yQzNiI" },
        // { id: 2, video: "https://www.youtube.com/watch?v=WP316ABiTt0" },
        // { id: 3, video: "https://www.youtube.com/watch?v=9kgiZGKI1OU" }
      ],
      crossVideo: ""
    };
  }
  submitHandler = videoLink => {
    const videoItem = {
      id: Math.floor(Math.random() * 10000),
      video: videoLink
    };
    this.setState({
      fullLink: videoLink,
      videoArr: [videoItem, ...this.state.videoArr]
    });
  };

  crossHandler = crossVideoId => {
    const newArr = this.state.videoArr.filter(line => line.id !== crossVideoId);
    this.setState({
      videoArr: newArr
    });
  };

  videoCompleteHandler = remVideoArr => {
    console.log(remVideoArr);
    this.setState({
      videoArr: remVideoArr
    });
  };

  orderChange = odrChgArr => {
    this.setState({
      videoArr: odrChgArr
    });
  };

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
                orderChange={this.orderChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
