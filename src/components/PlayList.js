import React from 'react';
import PropTypes from "prop-types";

const PlayList = (props) => (
    <div className="playlist">
        <div className="playlist-header">
            Playlist
        </div>
        <div className="playlist-list">
        {
            props.list.map((video,index) => {
                return (
                    <div className="playlist-card" key={index}>
                        <img className="thumb" src={video.thumbnail_url} />
                        <div className='title'>{video.title}
                        <a href={video.author_url} target="_blank" rel="noopener noreferrer">{video.author_name}</a>
                        </div>
                        <span className="remove">x</span>
                    </div>
                )
            })
        }
            
        </div>

        


    </div>
)

PlayList.propTypes={
    list: PropTypes.array.isRequired
}

export default PlayList;