import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactPlayer from "react-player";
import "../App.css";

export const VideoPlayer = () => {

  const [links, setLinks] = useState([]);
  const [videoUrl, setvideoUrl] = useState("");
  const [hasError, setHasError] = useState(false);

  var inputLink = useRef(null);

  const removeLink = idx => {
    const newLinks = [...links];
    newLinks.splice(idx, 1);
    setLinks(newLinks);
  };

  const handleKeydown = e => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (val.match(p)) {
        setHasError(false);
        if (links.find(tag => tag === val)) return;
        setLinks([...links, val]);
        inputLink.value = null;
        handlePlaylist(val);
      } else {
        setHasError(true);
      }
    }
  };

  const reorderPlaylist = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const videoLinks = reorderPlaylist(
      links,
      result.source.index,
      result.destination.index
    );
    setLinks(videoLinks);
  };

  const handlePlaylist = currentLink => {
    setvideoUrl(currentLink);
  };

  const onDeletePlaylist = async index => {
    links.splice(index, 1);
    setLinks(links);

    if (index === 0) {
      handlePlaylist(links[0]);
    }
  };

  const onVideoEnd = () => {
    const index = links.indexOf(videoUrl);
    onDeletePlaylist(index);
    handlePlaylist(links[0]);
  };
  
  return (
    <div>
      <input
        type="text"
        onKeyDown={handleKeydown}
        className="input-url"
        ref={c => {
          inputLink = c;
        }}
        placeholder="Please add youtube link"
      />
      {hasError && (
        <span className="error">
          Please add a valid youtube url ( eg :
          https://www.youtube.com/watch?v=OulN7vTDq1I )
        </span>
      )}
      <div className="card">
        <div className="player-wrapper ">
          {links.length ? (
            <ReactPlayer
              width="100%"
              height="100%"
              controls={true}
              className="react-player"
              url={videoUrl}
              playing={true}
              onEnded={() => onVideoEnd()}
            />
          ) : null}
        </div>
        <div className="playlist">
          <h4 className="text">PLAYLISTS</h4>
          <hr></hr>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {links.map((videoLink, idx) => (
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
                              className={`links ${videoLink ? "add-link" : ""}`}
                            >
                              {videoLink}
                              <img
                                src="../../close.png"
                                className="delete"
                                alt="delete"
                                onClick={() => {
                                  removeLink(idx);
                                }}
                              />
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
