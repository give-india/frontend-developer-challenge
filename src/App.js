import React from "react";
import "./App.css";
import { useRef } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import Links from "./Components/LinksTable/Links";
import Videoplayer from "./Components/VideoPlayer/Videoplayer";
import { Modal, Button } from "react-bootstrap";

function App() {
  let [vl, setVl] = useState("");
  let [videolinks, setVideolinks] = useState([]);
  let videoLink = useRef(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (videolinks.length !== 0) {
      setShow(true);
    } else {
      alert("please select some videos");
    }
  };

  let handleClick = () => {
    let value = vl;
    if (ReactPlayer.canPlay(value)) {
      setVideolinks([...videolinks, value]);
    } else {
      alert("sorry Please check the url");
    }
    setVl("");
  };

  let handleChange = (e) => {
    setVl(e.target.value);
  };

  let customremover = () => {
    setVideolinks(videolinks.slice(1, videolinks.length));
    if (videolinks.slice(1, videolinks.length).length === 0) {
      handleClose();
    }
  };
  return (
    <div className="App">
      <input
        type="text"
        ref={videoLink}
        placeholder="https://youtube.com/"
        style={{ width: "60vw", margin: "20px" }}
        value={vl}
        onChange={(e) => handleChange(e)}
      ></input>
      <button onClick={() => handleClick()} className="plybtn">
        Add To Playlist
      </button>
      <div className="row">
        <div className="col-md-12 text-center">
          <Links links={videolinks} oncsclick={handleShow} />
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Your PlayList</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Videoplayer
              urls={videolinks}
              oncustomRemover={() => customremover()}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;

// let value = videoLink.current.value;
