import React from 'react';
import './../App.css';

function PlayList(props) {
  const PlayListItems = props.data.map((video, id) => {
    return (
      <li
        className="list-group-item"
        onClick={() => props.onVideoSelect(video)}
        key={id}
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
            <div className="media-icons">
              <span onClick={() => props.onVideoRemove(video.etag)}>
                <i className="fa fa-trash-o" style={{ color: 'red' }}></i>
              </span>
              <span onClick={() => props.handleUpward(id)}>
                <i className="fa fa-arrow-up"></i>
              </span>
              <span onClick={() => props.handleDownWard(id)}>
                <i className="fa fa-arrow-down"></i>
              </span>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="col-md-4 list-container">
      <h4 style={{ textAlign: 'center' }}>My PlayList</h4>
      {props.data.length !== 0 ? (
        <ul className="list-group">{PlayListItems}</ul>
      ) : (
        <ul className="list-group empty">
          <h3>Empty PlayList</h3>
          <p>Add from the search result</p>
        </ul>
      )}
    </div>
  );
}

export default PlayList;
