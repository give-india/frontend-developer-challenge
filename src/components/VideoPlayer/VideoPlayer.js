import React, { Component, useState } from "react";
import "./VideoPlayer.scss";
import YouTube from "./Youtube";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const VideoPLayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [linkValue, setLinkValue] = useState("");
  const [message, setMessage] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const createPlaylist = () => {
    const tempPlaylist = [...playlist];
    if (linkValue.startsWith("https://youtu.be/")) {
      tempPlaylist.push(linkValue);
      setVideoSrc(
        tempPlaylist[0].substring(tempPlaylist[0].lastIndexOf("/") + 1)
      );
      setPlaylist(tempPlaylist);
      setLinkValue("");
    } else {
      setLinkValue("");
      setMessage("Please enter a valid youtube video link");
    }
  };
  const removeFromPlaylist = (index = 0) => {
    const tempPlaylist = [...playlist];
    if (tempPlaylist.length > 0) {
      if (index === 0) {
        tempPlaylist.shift();
        setVideoSrc(
          tempPlaylist[0].substring(tempPlaylist[0].lastIndexOf("/") + 1)
        );
        setPlaylist(tempPlaylist);
      } else {
        setVideoSrc(
          tempPlaylist[0].substring(tempPlaylist[0].lastIndexOf("/") + 1)
        );
        tempPlaylist.splice(index, 1);

        setPlaylist(tempPlaylist);
      }
    }
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      playlist,
      result.source.index,
      result.destination.index
    );
    setVideoSrc(items[0].substring(playlist[0].lastIndexOf("/") + 1));

    setPlaylist(items);
  };
  return (
    <div className="container">
      <div>
        <div className="video-placeholder">
          {!playlist.length > 0 ? (
            <div className="no-video-placeholder">
              Add Video to Playlist to start playing your Youtube Video Links
            </div>
          ) : (
            <YouTube
              videoSrc={videoSrc}
              setPlaylist={removeFromPlaylist}
            ></YouTube>
          )}
        </div>
        :
        <div class="field has-addons">
          <div class="control">
            <input
              class="input"
              type="url"
              required
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              placeholder="Paste a link to add video to playlist"
            />
          </div>
          <div class="control">
            <a class="button is-info" onClick={() => createPlaylist()}>
              Add to Playlist
            </a>
          </div>
        </div>
        {message.length > 0 ? (
          <div className="has-text-danger">{this.state.message}</div>
        ) : null}
        <div>
          {playlist.length > 0 ? (
            <>
            <table className="table is-bordered is-striped">
              <thead>
                <th>Video Links</th>
                <th>Remove</th>
              </thead>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                      {playlist.map((item, index) => (
                        <Draggable
                          key={index}
                          draggableId={`${item}-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <td>{item}</td>
                              <td onClick={() => removeFromPlaylist(index)}>
                                x
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                    </tbody>
                  )}
                </Droppable>
              </DragDropContext>
            </table>
            {playlist.length>1?    <div className="has-text-success">Drag rows up and down to shuffle your playlist..!! </div>:null}
        
            </>
          ) : (
            <div className="has-text-info">Playlist is empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPLayer;
