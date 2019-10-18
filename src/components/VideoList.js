import React from 'react';
import './../App.css';

function VideoList(props) {
  const videoItems = props.videos.map((video, id) => {
    return (
      <li
        className="list-group-item"
        // onClick={() => props.onVideoSelect(video)}
        key={video.etag}
      >
        <div className="video-list media">
          <div className="media-left">
            <img
              className="media-object"
              src={video.snippet.thumbnails.default.url}
              alt=""
            />
          </div>
          <div className="media-body">
            <div className="media-heading">{video.snippet.title}</div>
            <span
              onClick={() => props.playListData(video)}
              className="add-button"
            >
              Add
            </span>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="col-md-4 list-container">
      <h4 style={{ textAlign: 'center' }}>Search Result</h4>
      <ul className="list-group">{videoItems}</ul>
    </div>
  );
}

export default VideoList;
