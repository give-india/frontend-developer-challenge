import moment from 'moment';
import 'moment-duration-format';

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

// Interfaces
import { VideoInterface } from './interface';

// Styles
import './Video.scss';

const Video = ({ video, onDrop, index, onDrag }: VideoInterface) => {
  const { title, thumbnails } = video.items[0].snippet;
  const duration = moment
    .duration(video.items[0].contentDetails.duration)
    .format('h:mm:ss')
    .padStart(4, '0:0');

  const [, drag] = useDrag({
    item: { index, type: 'VIDEO' },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
    begin: () => onDrag(true),
    end: () => onDrag(false)
  });

  const [, drop] = useDrop({
    accept: 'VIDEO',
    drop: (item, monitor) => onDrop(item, index)
  });

  return (
    <div ref={drop}>
      <div className="grabbable video-item" ref={drag}>
        <div className="video-item__image">
          <img
            src={thumbnails.default.url}
            style={{
              height: 60,
              width: 60
            }}
            alt="video"
          />
        </div>
        <div className="video-item__info">
          <div className="video-item__name">{title}</div>
          <div className="video-item__time">{duration}</div>
        </div>
      </div>
    </div>
  );
};

export default Video;
