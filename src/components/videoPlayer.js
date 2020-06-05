import React, { useState, useRef } from "react";
import "../App.css";
import ReactPlayer from "react-player";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { regVideo } from './regex'

export const VideoPlayer = () => {


  const [youtubevideoUrl, setyoutubevideoUrl] = useState("");
  const [playlislinks, setPlaylislinksLinks] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [alreadyAdded, setalreadyAdded] = useState(false);

  var enteredLink = useRef(null);

  const InputHandler = e => {
    const linkValue = e.target.value;
    setalreadyAdded(false)
    if (e.key === "Enter" && linkValue) {
      if (regVideo.test(linkValue)) {
        setHasError(false);
        if (playlislinks.find(tag => tag === linkValue)) {
          setalreadyAdded(true)
          return
        } else {
          setalreadyAdded(false)
        }
        setPlaylislinksLinks([...playlislinks, linkValue]);
        enteredLink.value = null;
        handlePlaylist(linkValue);
      } else {
        setHasError(true);
      }
    }
    if (linkValue === "" || linkValue === null || linkValue === undefined) {
      setHasError(false);
      setalreadyAdded(false)
    }
  };

  const reorderVideos = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = res => {
    if (!res.destination) {
      return;
    }
    const videoLinks = reorderVideos(
      playlislinks,
      res.source.index,
      res.destination.index
    );
    setPlaylislinksLinks(videoLinks);
  };

  const handlePlaylist = currentLink => {
    setyoutubevideoUrl(currentLink);
  };

  const onVideoDelete = async index => {
    playlislinks.splice(index, 1);
    setPlaylislinksLinks(playlislinks);

    if (index === 0) {
      handlePlaylist(playlislinks[0]);
    }
  };

  const onVideoEnd = () => {
    const index = playlislinks.indexOf(youtubevideoUrl);
    onVideoDelete(index);
    handlePlaylist(playlislinks[0]);
  };

   // ---------------------------------Remove Video==================
   const removeLink = id => {
    const newLinks = [...playlislinks];
    newLinks.splice(id, 1);
    setPlaylislinksLinks(newLinks);
  };
   // ---------------------------------Remove Video End==================


  return (
    <div>
      <input
        type="text"
        onKeyDown={InputHandler}
        className="input-url"
        ref={c => {
          enteredLink = c;
        }}
        placeholder="Please add youtube link and press enter"
      />

      {hasError && (
        <span className="error">
          Invalid Youtube URL
        </span>
      )}
      {alreadyAdded && (
        <span className="error">
          Youtube URL Aready Added
        </span>
      )}
      <div className="card">
        <div className="player-wrapper ">
          {playlislinks.length ? (
            <ReactPlayer
              width="100%"
              height="100%"
              controls={true}
              className="react-player"
              url={youtubevideoUrl}
              playing={true}
              onEnded={() => onVideoEnd()}
            />
          ) : null}
        </div>
        <div className="playlist">
          <h4 className="text">Your Playlist</h4>
          <hr></hr>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {playlislinks.map((videoLink, idx) => (
                    <div key={idx}>
                      <Draggable
                        key={videoLink}
                        draggableId={videoLink}
                        index={idx}
                      >
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              onClick={() => handlePlaylist(videoLink)}
                              className={`playlislinks ${videoLink ? "add-link" : ""}`}
                            >
                              {idx + 1}) {videoLink}
                              <div className="delete" onClick={() => {
                                removeLink(idx);
                              }}>&times;</div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
