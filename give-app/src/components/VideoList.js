import React, { useState } from 'react';
import {connect} from 'react-redux';
import { removeVideo,moveDown,moveUp,dragDrop} from '../actions';
import ListItem from './ListItem';

const VideoList = props => {
    const [dragElement,setDragElement] = useState('');

    const removeVideo = video => {
        props.removeVideo(props.videoList.indexOf(video));
    }

    const moveUp = video => {
        props.moveUp(props.videoList.indexOf(video));
    }
    const moveDown = video => {
        props.moveDown(props.videoList.indexOf(video));
    }

    const dragDrop = (addVideo) => {
        const addIndex = props.videoList.indexOf(addVideo);
        const removeIndex = props.videoList.indexOf(dragElement);
        props.dragDrop(addIndex,removeIndex);
    }

    const renderList = () => {
        return props.videoList.map(video=>{
        return  <ListItem key={video} 
        selectedVideo={props.videoList[0]} 
        video={video} moveUp={moveUp}
         moveDown={moveDown} 
         removeVideo={removeVideo}
         dragDrop={dragDrop}
         setDragElement={setDragElement}/>
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
        videoList: state.videoList
    };
}

export default connect(mapStateToProps,{removeVideo,moveDown,moveUp,dragDrop})(VideoList);