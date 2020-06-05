import React, { Component } from 'react';
import YouTube from 'react-youtube';
import {connect} from 'react-redux';
import {popVideo} from '../actions';

const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

class VideoPlayer extends Component{
    onEnd = (e)=>{
        console.log(this.props.nextVideo);
        this.props.popVideo(this.props.nextVideo);
    }
    render(){
        console.log("selected"+this.props.selectedVideo);
    return(
        <div className="video-player-wrapper">
            <YouTube  className="video" videoId={this.props.selectedVideo} opts={opts} onError={this.onEnd} onEnd={this.onEnd} onStateChange={this._onReady}/>
        </div>
    );
    }
}

const mapStateToProps = (state)=>{
 return {
     selectedVideo: state.selectedVideo,
     nextVideo: state.videoList.length>1?state.videoList[1]:''
 }
}

export default connect(mapStateToProps,{popVideo})(VideoPlayer);