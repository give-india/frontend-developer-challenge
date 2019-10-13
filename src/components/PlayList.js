import React from 'react';
import PropTypes from "prop-types";
import { isvalidYoutubeUrl } from "../utils";

const PlayList = (props) => (
    <div className="playlist">
        <div className="playlist-header">
            Playlist
        </div>
        <div className="playlist-list">
        {
            props.list.map((video,index) => {
                return (
                    <div className="playlist-card" key={isvalidYoutubeUrl(video.url)} onClick={() => props.changeVideo(index)}>
                        <img className="thumb" src={video.thumbnail_url} />
                        <div className='title'>{video.title}
                        <a href={video.author_url} target="_blank" rel="noopener noreferrer">{video.author_name}</a>
                        </div>
                        <button className="remove" onClick={ () => props.removeVideo(video.url)}>x</button>
                    </div>
                )
            })
        }            
        </div>
    </div>
)

PlayList.propTypes={
    list: PropTypes.array.isRequired,
    removeVideo: PropTypes.func,
    changeVideo: PropTypes.func,
}

PlayList.defaultProps={
    removeVideo: () => {},
    changeVideo: () => {}
}

export default PlayList;