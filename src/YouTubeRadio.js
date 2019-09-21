import React from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebase.no-show.js"; // required for initializing the firebase-app; api-ref: https://firebase.google.com/docs/reference/js/firebase.html?authuser=0#initialize-app

const PLAYER_HEIGHT = "400";
const PLAYER_WIDTH = "600";
const FIREBASE_COLLECTION_NAME = "radio-videos"; // for saving and getting documents
const FIREBASE_ATTRIB_NAME_VIDEO_ID = "videoId"; // to save and get a youtube-video-id in a document

const Loading = () => {
  return <span className="w3-animate-spin">😮</span>;
};

class YouTubeRadio extends React.Component {
  state = {
    videoIds: [],
    url: "",
    current: "",
    loadingVideoIds: true,
    playerReady: false,
    isAlreadyMounted: false
  };

  constructor() {
    super();
    let isAlreadyMounted = localStorage["isAlreadyMounted"] ? true : false;
    this.state.isAlreadyMounted = isAlreadyMounted;
    if (!isAlreadyMounted) {
      localStorage["isAlreadyMounted"] = true;
      this.appHandle = firebase.initializeApp(firebaseConfig);
      this.cleanUp = this.cleanUp.bind(this);
      window.addEventListener("beforeunload", this.cleanUp);
    }
  }

  playNext = (vid, cb) => {
    let playlist = this.state.videoIds;
    if (playlist.length) {
      if (this.state.current) {
        if (vid) {
          let current = 0;
          let toCurrent = playlist.findIndex(id => id === vid);
          if (toCurrent >= 0) {
            playlist[current] = vid;
            playlist[toCurrent] = this.state.current;
          }
        } else {
          playlist = playlist.filter(id => id !== this.state.current);
        }
      }
      this.setState({ current: playlist[0], videoIds: playlist }, () => {
        window.ytPlayer.loadVideoById(playlist[0]);
        cb && cb();
      });
    }
  };

  onPlayerReady = event => {
    this.setState({ playerReady: true });
    this.playNext();
  };

  onPlayerStateChange = event => {
    localStorage["debug"] && console.log("state-change", event);
    if (event.data === window.YT.PlayerState.ENDED) {
      this.playNext();
    }
  };

  componentDidMount() {
    if (!this.appHandle) {
      return;
    }
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

  cleanUp() {
    window.ytPlayer && window.ytPlayer.destroy();
    if (this.appHandle) {
      this.appHandle.delete();
      delete localStorage["isAlreadyMounted"];
    }
    window.removeEventListener("beforeunload", this.cleanUp);
  }

  loadVideoList = async () => {
    let list = [];
    if (this.appHandle) {
      let dbHandle = this.appHandle.firestore();
      let querySnapshot = await dbHandle
        .collection(FIREBASE_COLLECTION_NAME)
        .get();
      querySnapshot.forEach(doc => {
        let data = doc.data();
        if (FIREBASE_ATTRIB_NAME_VIDEO_ID in data) {
          list.push(data[FIREBASE_ATTRIB_NAME_VIDEO_ID]);
        }
      });
    }
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

  handleEnter = async ({ keyCode }) => {
    let vid = this.extractVideoId();
    if (keyCode === 13 && vid) {
      if (this.appHandle) {
        let dbHandle = this.appHandle.firestore();
        let data = { on: Date.now() };
        data[FIREBASE_ATTRIB_NAME_VIDEO_ID] = vid;
        await dbHandle.collection(FIREBASE_COLLECTION_NAME).add(data);
        console.log(`video-added to db - ${vid}`);
      }
      this.setState(
        {
          videoIds: [...this.state.videoIds, vid],
          url: ""
        },
        () => {
          if (!this.state.current && this.state.playerReady) {
            this.playNext();
          }
        }
      );
    }
  };

  setPlayBack = vid => {
    if (this.state.current === vid) {
      if (
        window.ytPlayer.getPlayerState() === window.YT.PlayerState.PAUSED ||
        window.ytPlayer.getPlayerState() === window.YT.PlayerState.UNSTARTED
      ) {
        window.ytPlayer.playVideo();
      } else {
        window.ytPlayer.pauseVideo();
      }
    } else {
      window.ytPlayer.pauseVideo();
      this.playNext(vid, () => {
        window.ytPlayer.playVideo();
      });
    }
  };

  render() {
    if (this.state.isAlreadyMounted) {
      return (
        <div className="w3-display-middle w3-panel w3-round w3-xxlarge w3-aqua w3-text-grey w3-wide">
          Already opened in some tab :)
        </div>
      );
    }
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
                      className={this.state.current === vId ? "w3-blue" : ""}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <span
                        className={`w3-btn w3-hover-${
                          this.state.current === vId ? "red" : "green"
                        }`}
                        onClick={() => this.setPlayBack(vId)}
                      >
                        {this.state.current === vId ? "😎" : "😴"}
                      </span>
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
