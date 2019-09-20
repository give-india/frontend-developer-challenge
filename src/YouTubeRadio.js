import React from "react";

const PLAYER_HEIGHT = "400";
const PLAYER_WIDTH = "600";

class YouTubeRadio extends React.Component {
  state = {
    videoIds: [],
    url: ""
  };
  onPlayerReady = event => {
    this.state.videoIds.length &&
      event.target.loadPlaylist(this.state.videoIds);
  };
  onPlayerStateChange = event => {
    console.log("state-change", event);
  };

  componentDidMount() {
    this.loadVideoList();
    window.onYouTubeIframeAPIReady = () => {
      window.ytPlayer = new window.YT.Player("youtube-player", {
        height: PLAYER_HEIGHT,
        width: PLAYER_WIDTH,
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange
        }
      });
    };
    let script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.append(script);
  }

  loadVideoList = async () => {
    let list = [];
    this.setState({ videoIds: list });
  };

  handleEnter = ({ keyCode }) => {
    if (keyCode === 13) {
      this.setState({
        videoIds: [...this.state.videoIds, this.state.url],
        url: ""
      });
    }
  };

  render() {
    return (
      <div
        className="w3-container"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          minHeight: "100vh"
        }}
      >
        <div
          className="w3-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div id="youtube-player" />
        </div>
        <div
          className="w3-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch"
          }}
        >
          <input
            className="w3-input"
            onChange={({ target: { value } }) => {
              this.setState({ url: value });
            }}
            placeholder="Enter youtube url to add to list"
            value={this.state.url}
            onKeyDown={this.handleEnter}
          />
          {!!this.state.videoIds.length && (
            <ul
              className="w3-ul w3-border w3-mobile w3-card"
              style={{
                marginLeft: "0.2rem",
                width: "20vw",
                marginTop: "0.2rem",
                maxHeight: "90vh",
                overflow: "auto"
              }}
            >
              {this.state.videoIds.map(video => {
                return <li key={video}>{video}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default YouTubeRadio;
