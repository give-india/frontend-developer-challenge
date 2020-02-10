import React from 'react';
import { useDrop } from 'react-dnd';

// third party libraries
import ReactPlayer from 'react-player';

// Interfaces
import { PlayerInterface } from './interface';

// Styles
import './Player.scss';

const retrievedStats = localStorage.getItem('stats');
const progress = retrievedStats ? JSON.parse(retrievedStats).progress : 0;

const Player = ({
  classes,
  playing,
  drop2Play,
  onProgress,
  onEnded,
  isDragging
}: PlayerInterface) => {
  const [, drop] = useDrop({
    accept: 'VIDEO',
    drop: (item, monitor) => {
      drop2Play(item);
      // onDrag(false)
    }
  });

  return (
    <div className={`${classes} player-container`} ref={drop}>
      {playing ? (
        <ReactPlayer
          className="player-container__player"
          url={`https://www.youtube.com/watch?v=${playing.items[0].id}&t=${progress}`}
          onProgress={onProgress}
          onEnded={onEnded}
          controls
          playing={true}
        />
      ) : (
        <div
          className="player-container__player"
          style={{ background: '#000' }}
        >
          <img
            className="player-container__no-video"
            src="http://icons.iconarchive.com/icons/awicons/vista-artistic/72/delete-icon.png"
            alt=""
          />
        </div>
      )}
      {isDragging && (
        <div className="player-container__overlay" ref={drop}>
          {!playing ? (
            <div className="player-container__text">drop here to play</div>
          ) : (
            <div className="player-container__text no-drop">
              You can't drop item now
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Player;
