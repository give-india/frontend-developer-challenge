import React from "react";

const PLAYER_HEIGHT = "400";
const PLAYER_WIDTH = "600";

const Loading = () => {
  return "....";
};

class YouTubeRadio extends React.Component {
  state = {
    videoIds: [],
    url: "",
    current: "",
    loadingVideoIds: true,
    playerReady: false
  };

  playNext = () => {
    let playlist = this.state.videoIds;
    if (this.state.current) {
      playlist = playlist.filter(vid => vid !== this.state.current);
    }
    if (playlist.length) {
      this.setState({ current: playlist[0], videoIds: playlist }, () => {
        window.ytPlayer.loadVideoById(playlist[0]);
      });
    }
  };

  onPlayerReady = event => {
    this.setState({ playerReady: true });
    this.playNext();
  };

  onPlayerStateChange = event => {
    console.log("state-change", event);
    if (event.data === window.YT.PlayerState.ENDED) {
      this.playNext();
    }
  };

  componentDidMount() {
    this.loadVideoList().then(list => {
      this.setState({ videoIds: list, loadingVideoIds: false }, () => {
        let script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.append(script);
      });
    });
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
  }

  componentWillUnmount() {
    window.ytPlayer && window.ytPlayer.destroy();
  }

  loadVideoList = async () => {
    let list = [];
    return [...list, ...this.state.videoIds];
  };

  extractVideoId = () => {
    if (this.state.url) {
      let urlRegex = /https:\/\/www.youtube.com\/watch\?v=([0-9A-Za-z_]{5,})/;
      let match = this.state.url.match(urlRegex);
      if (match) {
        let videoId = match[1];
        return videoId;
      }
    }
    return "";
  };

  handleEnter = ({ keyCode }) => {
    let vid = this.extractVideoId();
    if (keyCode === 13 && vid) {
      this.setState(
        {
          videoIds: [...this.state.videoIds, vid],
          url: ""
        },
        () => {
          if (!this.current && this.state.playerReady) {
            this.playNext();
          }
        }
      );
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
          className="w3-container w3-mobile"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            padding: "0.2rem",
            minWidth: "30vw"
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
              className="w3-ul w3-border w3-card w3-mobile"
              style={{
                marginTop: "0.2rem",
                maxHeight: "90vh",
                overflow: "auto"
              }}
            >
              {this.state.loadingVideoIds ? (
                <Loading />
              ) : (
                this.state.videoIds.map((vId, index) => {
                  let link = `https://www.youtube.com/watch?v=${vId}`;
                  return (
                    <li
                      key={`${vId}-${index}`}
                      className={this.state.current === vId ? "w3-teal" : ""}
                    >
                      <a href={link}>{link}</a>
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default YouTubeRadio;
