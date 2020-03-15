import React from "react";
import MyYouTubePlayer from "../components/player";
import SidePanel from "../components/side-panel";
import "../styles/playlist.css";

const MainContainer = () => (
  <div className="main-container">
    <div className="player-grid">
      <MyYouTubePlayer />
    </div>
    <div className="panel-grid">
      <SidePanel />
    </div>
  </div>
);

export default MainContainer;
