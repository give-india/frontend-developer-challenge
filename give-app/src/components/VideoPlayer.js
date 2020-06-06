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
        this.props.popVideo();
    }
    render(){
    return(
        <div className="video-player-wrapper">
            {this.props.videoList.length?null:<div className="add-video-modal"><span className="modal-text">Add YouTube video Links</span></div>}
            <YouTube  className="video" videoId={this.props.videoList[0]} opts={opts} onError={this.onEnd} onEnd={this.onEnd} onStateChange={this._onReady}/>
        </div>
    );
    }
}

const mapStateToProps = (state)=>{
 return {
     videoList: state.videoList
 }
}

export default connect(mapStateToProps,{popVideo})(VideoPlayer);