import React from 'react';
import {connect} from 'react-redux';
import { removeVideo,moveDown,moveUp } from '../actions';

const VideoList = props => {
    const removeVideo = video => {
        props.removeVideo(props.videoList.indexOf(video));
    }

    const moveUp = video => {
        props.moveUp(props.videoList.indexOf(video));
    }
    const moveDown = video => {
        props.moveDown(props.videoList.indexOf(video));
    }

    const renderList = () => {
        return props.videoList.map(video=>{
        return  <div className={`list-item ${props.selectedVideo == video?`highLight`:''}`} key={video}> 
        <span className="material-icons arrow-icon-up icons" onClick={()=>moveUp(video)}>keyboard_arrow_up</span>
        <span className="material-icons arrow-icon-down icons" onClick={()=>moveDown(video)}>keyboard_arrow_down</span>
        <span className="link">Link: </span>{video} 
        <span className="material-icons close-icon icons" onClick={()=>removeVideo(video)}>close</span>
        </div>
        });
    }

    return (
        <div className="video-list-wrapper">
            <div className="title">PLAY LIST</div>
            {renderList()}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        videoList: state.videoList,
        selectedVideo: state.selectedVideo
    };
}

export default connect(mapStateToProps,{removeVideo,moveDown,moveUp})(VideoList);