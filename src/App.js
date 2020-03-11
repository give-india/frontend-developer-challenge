import React, { useRef, useState } from "react";
import "./styles.css";
import PlyList from "./PlayList";
import Player from "./Player";
import { INPUT_PLACEHOLDER, PLEASE_ADD_A_VIDEO_TO_PLAYLIST, PLEASE_ADD_VALID_LINK, VIDEO_ALREADY_IN_PLAYLIST } from "./constants";

export default function App(props) {
  const [videos, setVideos] = useState({
    videos: [
      {
        id: "Link 1583925582680",
        link: "BU53zRWeUHM"
      }
    ]
  });
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
      const videosLink = videos.videos;
      const link = input.split("be/").length>1 ? input.split("be/")[1] : (input.split("?v=").length>1 ? input.split("?v=")[1]: "");
      const match = videosLink.find((video)=> video.link === link)
      if (match) {
        return setInputError({ inputError: VIDEO_ALREADY_IN_PLAYLIST});
      }
      videosLink.unshift({
        id: `Link ${Date.now()}`,
        link: link
      });
      setVideos({
        videos: videosLink
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
    const updatedVideos = videos.videos.filter(video => {
      return video.id !== id;
    });
    setVideos({
      videos: updatedVideos
    });
  };

  const handleChangeVideo = id => {
    const index = videos.videos.findIndex((video)=>video.id === id);
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
        links={videos.videos}
        handleRemoveVideo={handleRemoveVideo}
        handleChangeVideo={handleChangeVideo}
        playerIndex={playerIndex}
      />
      {videos.videos.length > 0 ? <Player video={videos.videos[playerIndex]} handleVideoEnd={handleVideoEnd} />: <h1>{PLEASE_ADD_A_VIDEO_TO_PLAYLIST}</h1>}
    </div>
  );
}
