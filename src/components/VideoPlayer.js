import React from 'react';
import PropTypes from "prop-types";
import Youtube from "react-youtube";
import { isvalidYoutubeUrl } from '../utils';

const VideoPlayer = (props) => {
return (
    <div className="video-player">
        {props.video ? <Youtube 
            videoId={isvalidYoutubeUrl( props.video.url)}
            opts={{
                height: '530px',
                width: '850px',
                playerVars: {
                  autoplay: 1
                }
              }} 
            onEnd={props.end}
              />: 'Please Add a video'
}
    </div>
)
}

VideoPlayer.propTypes = {
   video: PropTypes.object.isRequired,
    end:PropTypes.func,
}

VideoPlayer.defaultProps = {
    id: '',
    end: () => {}
}
export default VideoPlayer;