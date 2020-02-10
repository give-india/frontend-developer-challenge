import React from 'react';

// components
import Video from 'components/Video';

// Interfaces
import { PlayListInterface } from './interface';

// Styles
import './PlayList.scss';

const PlayList = ({
  classes,
  playlist,
  onDrop,
  onDrag,
  playNext,
  disableButton
}: PlayListInterface) => {
  return (
    <div className={`${classes} play-list-main`}>
      <div className="play-list-main__header">
        <span>Playlist</span>
        <button
          className="cursor play-list-main__next"
          onClick={playNext}
          disabled={disableButton}
        >
          next{' '}
          <img
            src="http://icons.iconarchive.com/icons/hopstarter/button/16/Button-Next-icon.png"
            alt=""
          />
        </button>
      </div>
      <div className="play-list-main__list">
        {playlist.map((video: any, index: number) => (
          <Video
            video={video}
            onDrop={onDrop}
            onDrag={onDrag}
            index={index}
          ></Video>
        ))}
      </div>
    </div>
  );
};

export default PlayList;
