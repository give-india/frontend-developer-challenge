import React from 'react'

import PlayListItem from './Item.PlayList';

const PlayList = ({
    videoList,
    handleDelete,
    nowPlaying,
    handleMove
}) => {
    return (
        <>
            <ul className="list">
                {videoList.map((video, index) => {
                    return <PlayListItem
                        videoList={videoList}
                        key={index}
                        index={index}
                        video={video}
                        handleDelete={handleDelete}
                        nowPlaying={nowPlaying}
                        handleMove={handleMove}
                    />
                })}
            </ul>
        </>
    )
}

export default PlayList
