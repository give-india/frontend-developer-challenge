import React from 'react';
import PropTypes from "prop-types";

const PlayList = (props) => (
    <div className="play-list">
        <div className="playlist-header">
            Playlist
            </div>
        {
            props.list.map((video,index) => {
                return (
                    <div className="play-list-card" key={index}>{video.title}</div>
                )
            })
        }


    </div>
)

PlayList.propTypes={
    list: PropTypes.array.isRequired
}

export default PlayList;