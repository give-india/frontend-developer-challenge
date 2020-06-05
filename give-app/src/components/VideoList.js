import React from 'react';
import {connect} from 'react-redux';
import { removeVideo,moveDown,moveUp } from '../actions';
import ListItem from './ListItem';

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
        return  <ListItem key={video} selectedVideo={props.selectedVideo} video={video} moveUp={moveUp} moveDown={moveDown} removeVideo={removeVideo}/>
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