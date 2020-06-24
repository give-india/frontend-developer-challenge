import React from 'react';
import ReactPlayer from 'react-player/lazy';

import './index.css';

const Player = ({
    activeItem,
    videoEndedHandler
}) => (
        <div className="player">
            <ReactPlayer
                playing
                controls
                className='reactPlayer'
                onEnded={videoEndedHandler}
                url={activeItem ? activeItem.url : ''}
            />
        </div>
    )

export default Player;