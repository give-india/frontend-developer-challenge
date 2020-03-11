import React, { useRef, useState } from "react";
import "./styles.css";
import PlyList from "./PlayList";
import Player from "./Player";
import { INPUT_PLACEHOLDER, PLEASE_ADD_A_VIDEO_TO_PLAYLIST, PLEASE_ADD_VALID_LINK, VIDEO_ALREADY_IN_PLAYLIST } from "./constants";
import { connect } from 'react-redux'
import * as actions from "./redux/action"
import { bindActionCreators } from 'redux'

function App(props) {
  const videos = props.videos;
  const [inputError, setInputError] = useState("");
  const [playerIndex, setPlayerIndex] = useState(0);
  const videoLinkInput = useRef(null);

  const validateYTVideoLink = (link) => {
    if (link && (link.includes("https://youtu.be/") || link.includes("https://www.youtube.com/watch?v="))) {
        return true;
    }
    return false
  }

  const handleSubmit = () => {
    const input = videoLinkInput.current.value;
    if (validateYTVideoLink(input)) {
      videoLinkInput.current.value = "";
      const videosLink = videos;
      const link = input.split("be/").length>1 ? input.split("be/")[1] : (input.split("?v=").length>1 ? input.split("?v=")[1]: "");
      const match = videosLink.find((video)=> video.link === link)
      if (match) {
        return setInputError({ inputError: VIDEO_ALREADY_IN_PLAYLIST});
      }
      props.addVideoToPlayList({
        id: `Link ${Date.now()}`,
        link: link
      });
    } else {
      videoLinkInput.current.value = "";
      setInputError({ inputError: PLEASE_ADD_VALID_LINK});
    }
  };

  const handleInputFocus = () => {
    setInputError({ inputError: "" });
  };

  const handleVideoEnd = id => {
    setPlayerIndex(0);
    handleRemoveVideo(id);
  }

  const handleRemoveVideo = id => {
    setPlayerIndex(0);
    props.removeVideoToPlayList(id);
  };

  const handleChangeVideo = id => {
    const index = videos.findIndex((video)=>video.id === id);
    setPlayerIndex(index);
  }

  let InputStyle = inputError.inputError
    ? { borderColor: "red" }
    : { borderColor: "" };

  return (
    <div className="App">
      <input
        type="text"
        ref={videoLinkInput}
        onClick={handleInputFocus}
        style={InputStyle}
        placeholder= {inputError.inputError ? inputError.inputError : INPUT_PLACEHOLDER}
      />
      <button type="button" onClick={handleSubmit}>
        Add to Play List
      </button>

      <PlyList
        links={videos}
        handleRemoveVideo={handleRemoveVideo}
        handleChangeVideo={handleChangeVideo}
        playerIndex={playerIndex}
      />
      {videos.length > 0 ? <Player video={videos[playerIndex]} handleVideoEnd={handleVideoEnd} />: <h1>{PLEASE_ADD_A_VIDEO_TO_PLAYLIST}</h1>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    videos: [...state.links],
    playerIndex: state.playerIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators (actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(App);
