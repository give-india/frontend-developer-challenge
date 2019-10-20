import React from 'react';

function TrackList({tracks, onDelete}) {
  return (
    <div className="tracklist-container">
      <div className="trackTitle">Playlist</div>
      <div className="tracklist">
        {tracks.length === 0
          ? <div>No tracks to play.</div>
          : tracks.map (track => {
              return (
                <div className="track-item" key={track.id}>
                  <div>{track.name}</div>
                  <div onClick={() => onDelete (track.id)} className="closeBtn">
                    X
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default TrackList;
