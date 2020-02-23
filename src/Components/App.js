import React from "react";
import "./App.css";
import io from "socket.io-client";
import { Card, TextField, Button, Divider } from "@material-ui/core";
import YouTube from "react-youtube";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import _ from "underscore";

const socket = io("http://localhost:8031/");
var validUrl = require("valid-url");
const youtube_regex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;

function App() {
  const [url, setUrl] = React.useState("");
  const [playlist, setPlaylist] = React.useState([]);
  const [link, setLink] = React.useState("");
  const [video_id, setVideo_id] = React.useState(1);

  // this will update state (running video and playlist) for real-time
  React.useEffect(() => {
    socket.on("playlist", data => {
      setPlaylist(data);
    });
    socket.on("live_video", live_url => {
      setLink(live_url);
    });
  }, []);

  // this function return ID from youtube url
  const youtube_id = url => {
    const parsed = url.match(youtube_regex);
    if (parsed && parsed[2]) {
      return parsed[2];
    }
  };

  // this function create ID from a valid url and push to playlist table
  const add_Url = e => {
    if (url && validUrl.isUri(url)) {
      let mylist = playlist;
      if (youtube_id(url) !== undefined) {
        let newData = {};    // creating a new dictionary to store id and url
        newData["id"] = video_id;
        newData["url"] = youtube_id(url);

        mylist.push(newData);

        socket.emit("playlist", mylist);      // socket.io/ updating playlist
        setUrl("");
        setVideo_id(video_id + 1);
        if (playlist.length === 1) {
          let valid_url = youtube_id(url);
          socket.emit("live_video", valid_url);
        }
      } else {
        window.alert("This is not a youtube video url");
      }
    } else {
      window.alert("Url is not valid");
    }
  };

  // this function delets data from playlist
  const deleteFromPlaylist = i => {
    let mylist = playlist;

    let dict = _.find(mylist, item => {
      return item.id === i;
    });
    let index = mylist.indexOf(dict);

    mylist.splice(index, 1);

    if (mylist.length === 0) {
      socket.emit("live_video", "");
    } else if (dict.url === link) {
      socket.emit("live_video", mylist[0].url);
    }
    socket.emit("playlist", mylist);
  };

  // this function from react-youtube module, it helps to autoplay
  const opts = {
    playerVars: { autoplay: 1 }
  };

  // this function is for deleting already played video and replay next
  // this function will call when video will finish or url will has any error
  const endOrErr = () => {
    let mylist = playlist;
    let item = _.find(mylist, i => {
      return i.url === link;
    }); // return the dictionary from the array
    let index = mylist.indexOf(item); // return the index of the dict in Array
    mylist.splice(index, 1);
    socket.emit("playlist", mylist); // socket.io/ updating playlist
    mylist.length > 0
      ? socket.emit("live_video", mylist[0].url)
      : socket.emit("live_video", "");
  };

  // this function is of RLDD, gives new rearranged list after shuffling
  const handleRLDDChange = reorderedItems => {
    socket.emit("playlist", reorderedItems); // socket.io/ updating playlist
  };

  const itemRenderer = (item, index) => {
    return (
      <div className="item">
        <p className="title">{item.title}</p>
        <p className="body">{item.body}</p>
        <div>
          <Card className="playlist-div">
            <h3>{item.url}</h3>
            <h3 id="close-icon" onClick={() => deleteFromPlaylist(item.id)}>x</h3>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="div-1">
        <Card className="textfield-card">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={url}
            onChange={e => {
              setUrl(e.target.value);
            }}
          />
          <Button
            onClick={add_Url}
            style={{
              background: "red",
              color: "white",
              fontWeight: "bold",
              width: "20%",
              maxWidth: "150px"
            }}
          >
            Add
          </Button>
        </Card>
        <div className="iframe-div">
          <YouTube
            videoId={link}
            containerClassName={"cont-string"}
            className={"string"}
            opts={opts}
            onEnd={endOrErr}
            onError={endOrErr}
          />
        </div>
      </div>
      <hr />
      <div className="div-2">
        <div>
          <Button
            style={{
              background: "#2196f3",
              color: "white",
              fontWeight: "bold",
              width: "100%",
              height: "78px",
              fontSize: "larger"
            }}
          >
            Playlist
          </Button>
          <RLDD
            items={playlist}
            itemRenderer={itemRenderer}
            onChange={handleRLDDChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
