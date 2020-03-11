import React from "react";

export default function PlyList(props) {
  return (
    <div id="playlist">
      <div id="playlist-header">Play List</div>
      <hr/>
      <div>
      {props.links.map((link, index) => (
        <div id="playlist-element">
          <span id="link-name" onClick={() => props.handleChangeVideo(link.id)}style={index === props.playerIndex ? {color: "blue"}:{}} >{link.id}</span>
          <button onClick={() => props.handleRemoveVideo(link.id)} id="close">X</button>
        </div>
      ))}
      </div>
    </div>
  );
}
