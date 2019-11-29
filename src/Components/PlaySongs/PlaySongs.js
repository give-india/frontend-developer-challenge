import React from "react";
import { connect } from "react-redux";
import YoutubeComponent from "./YoutubeComponent/YoutubeComponent";
import PlaylistLinks from "./PlaylistLinks/PlaylistLinks";

import "./playSongs.css";
import AddLinkComponent from "./AddLinkComponent/AddLinkComponent";

class PlaySongs extends React.Component {
  render() {
    return (
      <div>
        <AddLinkComponent />
        <div className="outerDiv">
          {this.props.linkData.length > 0 ? <YoutubeComponent /> : ""}
          <PlaylistLinks />
        </div>
      </div>
    );
  }
}

const mapStateToProps = statef => {
  return {
    linkData: statef.songsData.linkData
  };
};

export default connect(mapStateToProps, null)(PlaySongs);
