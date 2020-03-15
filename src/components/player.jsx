import React from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { removeVideo } from "../redux/actions/player.actions";

class MyYouTubePlayer extends React.Component {
  /**Player methods */
  _onEnd = e => {
    this.props.removeVideo(0);
  };

  _onReady = e => {
    e.target.pauseVideo();
  };

  render() {
    const { playlist } = this.props;

    const [play] = playlist;
    let videoId = "";
    if (play) {
      videoId = Object.keys(play)[0];
    }

    const opts = {
      height: "300",
      width: "500",

      playerVars: {
        autoplay: 1,
        modestbranding: 1
      }
    };

    return (
      <div>
        <YouTube
          videoId={videoId}
          opts={opts}
          onEnd={this._onEnd}
          className="player"
          onStateChange={this.stateChange}
          onReady={this._onReady}
          showRelatedVideo={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist
});

const mapDispatchToProps = dispatch => ({
  removeVideo: song_id => dispatch(removeVideo(song_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyYouTubePlayer);
