import React from 'react';
import ReactPlayer from 'react-player/lazy';

import './index.css';

const Player = ({
    activeItem,
    videoEndedHandler
}) => {
    console.log('active Item>>>', activeItem)
    return (
        <div className="player">
            <ReactPlayer
                playing
                className='reactPlayer'
                onEnded={videoEndedHandler}
                url={activeItem ? activeItem.url : ''}
            />
        </div>
    )
}

export default Player;