import React from 'react'

const PlayListItem = ({
    video,
    index,
    videoList,
    handleDelete,
    nowPlaying,
    handleMove
}) => {
    const {id, videoLink} = video;

    const showDeleteBtn = () => {
        return nowPlaying && nowPlaying.id !== id ? 
            <button
                className="btn delete-btn"
                aria-label="delete button"
                onClick={() => handleDelete(id)}
            >Delete</button>
            : <button className="btn nowplaying">Now Playing</button>;
    };

    const showMoveUpBtn = () => {
        return nowPlaying && index !== 1 && nowPlaying.id !== id ? 
            <button
                className="btn move-btn"
                aria-label="move-up button"
                onClick={() => handleMove(index, -1)}
            >Move Up</button>: ''
    }

    const showMoveDownBtn = () => {
        return nowPlaying && index !== videoList.length - 1 && nowPlaying.id !== id ? 
            <button
                className="btn move-btn"
                aria-label="move-down button"
                onClick={() => handleMove(index, 1)}
            >Move Down</button>: ''
    }
    
    return (
        <li className="item">
            <div className="info">
                <strong>{index + 1}. </strong><span className="videoLink">{videoLink}</span>
            </div>
            <div className="item-btn">
                {showDeleteBtn()}
                {showMoveUpBtn()}
                {showMoveDownBtn()}
            </div>
        </li>
    )
}

export default PlayListItem
