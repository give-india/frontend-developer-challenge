import React from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { playThisSong, removeFromList } from "../../../actions/PlaySongsActions";

class YoutubeComponent extends React.Component {
  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <YouTube
        videoId={this.props.currentPlayingId}
        opts={opts}
        onReady={this._onReady}
        onEnd={this._onEnd}
      />
    );
  }

  _onEnd = () => {
    let currentIndex = 0;
    let currentPlayingId = this.props.currentPlayingId;
    for (let i = 0; i < this.props.linkData.length; i++) {
      if (this.props.linkData[i].key === this.props.currentPlayingId) {
        currentIndex = i;
        break;
      }
    }
    if (currentIndex === this.props.linkData.length - 1) {
      this.props.playThisSong(this.props.linkData[0].key);
    } else {
      this.props.playThisSong(this.props.linkData[currentIndex + 1].key);
    }
    this.props.removeFromList([...this.props.linkData],currentPlayingId);
  };

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

const mapStateToProps = statef => {
  return {
    currentPlayingId: statef.songsData.currentPlayingId,
    linkData: statef.songsData.linkData
  };
};

const mapDispatchToProps = dispatch => ({
    playThisSong: (playKey) => dispatch(playThisSong(playKey)),
    removeFromList: (linkData,deleteKey) => dispatch(removeFromList(linkData,deleteKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeComponent);
