import React from "react";
import "./videoplayer.css";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableColumn from "./table-column";
import Axios from "axios";
import CancelIcon from "@material-ui/icons/Cancel";

class Videoplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchlist: [],
      videos: [],
      title: [],
      submit: false,
      videoslist: [],

      index: {},
    };

    this.ValidateandStoreYouTubeUrl = this.ValidateandStoreYouTubeUrl.bind(
      this
    );
    this.CaptureInput = this.CaptureInput.bind(this);
    this.PlayVideoOnClick = this.PlayVideoOnClick.bind(this);
    this.RemoveVideo = this.RemoveVideo.bind(this);
  }
  CaptureInput(e) {
    this.setState({ searchlist: e.target.value });

    this.setState({ submit: false });
  }

  ValidateandStoreYouTubeUrl() {
    var url = this.state.searchlist;

    if (url !== undefined || url !== "") {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = String(url).match(regExp);
      if (match && match[2].length === 11) {
        Axios.get(
          "https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=" +
            match[2] +
            "&key=AIzaSyA2C-BM8G6bwRbP6lmfEZ6Lz4mdR0h5au8"
        ).then((res) => {
          this.state.videoslist.push(res.data.items[0]);

          this.setState({ ...this.state.videoslist });
        });
      } else {
        alert("Invalid url Please Check");
        this.setState({ submit: false });
      }
    }
  }

  PlayVideoOnClick = (video, index) => {
    const id = video.id;

    const videosrc =
      "https://www.youtube.com/embed/" + id + "?autoplay=1&enablejsapi=1";

    this.setState({ videos: videosrc });

    this.setState({ submit: true });
    this.setState({ index: index });
  };
  RemoveVideo(index) {
    this.state.videoslist.splice(index, 1);
    this.setState({ submit: false });
    console.log(this.state.submit);
  }

  componentDidUpdate = () => {
    const loadVideo = () => {
      console.info(`loadVideo called`);

      (function loadYoutubeIFrameApiScript() {
        console.log("this is loadyoutube...");
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        tag.onload = setupPlayer;
      })();

      let player = null;

      function setupPlayer() {
        console.log("this is setup....");
        window.YT.ready(function () {
          player = new window.YT.Player("my-video", {
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange,
            },
          });
        });
      }

      function onPlayerReady(event) {
        event.target.playVideo();
      }

      const onPlayerStateChange = (event) => {
        console.log(event);
        var videoStatuses = Object.entries(window.YT.PlayerState);

        if (
          videoStatuses.find((status) => status[1] === event.data)[0] ===
          "ENDED"
        ) {
          this.state.videoslist.splice(this.state.index, 1);
          this.setState({ submit: false });
        }
      };
    };
    if (document.readyState !== "loading") {
      console.info(`document.readyState ==>`, document.readyState);
      loadVideo();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        console.info(`DOMContentLoaded ==>`, document.readyState);
        loadVideo();
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="body">
          <div className="row">
            <div class="container">
              <div className="header">
                <form>
                  <TextField
                    type="text"
                    label="Enter URL"
                    variant="outlined"
                    onChange={this.CaptureInput}
                  />
                  <span className="btn">
                    <Button
                      variant="contained"
                      className="btn"
                      onClick={this.ValidateandStoreYouTubeUrl}
                      size="small"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </span>
                </form>
              </div>
              <div className="playlist">
                <TableContainer component={Paper}>
                  <Table className="table" aria-label="simple table">
                    <TableColumn columnNames={["Video", "Title", "Remove"]} />

                    <TableBody>
                      {this.state.videoslist.map((video, index) => {
                        return (
                          <TableRow id="tab" key={index}>
                            <TableCell
                              className="playlist-details"
                              style={{ width: "15%" }}
                              id={video.id}
                              onClick={() =>
                                this.PlayVideoOnClick(video, index)
                              }
                            >
                              <img
                                src={video.snippet.thumbnails.default.url}
                                alt="ima"
                                id={video.id}
                              />
                            </TableCell>
                            <TableCell
                              className="playlist-details"
                              style={{ width: "15%" }}
                              id={video.id}
                              onClick={() =>
                                this.PlayVideoOnClick(video, index)
                              }
                            >
                              {video.snippet.title}
                            </TableCell>
                            <TableCell>
                              <CancelIcon
                                onClick={() => {
                                  this.RemoveVideo(index);
                                  this.setState({ submit: false });
                                }}
                              ></CancelIcon>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              <div className="videoplayer">
                {this.state.submit ? (
                  <iframe
                    id="my-video"
                    title="vid"
                    src={this.state.videos}
                    width="500"
                    height="500"
                    frameborder="0"
                    application="youtube"
                    allowfullscreen
                    onLoad={this.runScript}
                  ></iframe>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Videoplayer;
