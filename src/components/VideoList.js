import React,  { useState } from 'react';
import PropTypes from 'prop-types'
import Video from './Video'
import ReactPlayer from 'react-player'

const VideoList = ({ videos, onVideoClick, moveUp, moveDown }) => {
  var [index, setIndex] = useState(0);
  return (
  <ul>
    {videos.map((video,index) => {

      return <Video
        key={video.id}
        {...video}
        onClick={() => onVideoClick(video.id)}
        upArrow={() => moveUp(index,videos.length)}
        downArrow={() => moveDown(index,videos.length)}
      />
    })}

  <ReactPlayer
    url={videos[index] ? videos[index].text : 'https://www.youtube.com/watch?v=oUFJJNQGwhk'
    }
    playing={true}
    controls={true}
    onEnded={() => onVideoClick(videos[index].id) }
  />

 
  </ul>
)
    }

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onVideoClick: PropTypes.func.isRequired
}

export default VideoList
