import React from 'react';

// Interfaces
import { DetailsInterface } from './interface';

// Styles
import './Details.scss';

const Details = ({ clear, details }: DetailsInterface) => {
  const { title, publishedAt } = details.items[0].snippet;
  const date = new Date(publishedAt).toUTCString().split(' ');
  return (
    <div className="video-details">
      <div className="video-details__stats">
        <div className="video-details__tittle">{title}</div>
        <div className="video-details__info">
          <div className="video-details__views">
            {Number(details.items[0].statistics.viewCount).toLocaleString()}{' '}
            views
          </div>
          <div className="video-details__published">
            Published on {`${date[2]} ${date[1]}, ${date[3]}`}
          </div>
        </div>
      </div>
      <div className="video-details__clear-list">
        <button className="cursor video-details__clear-btn" onClick={clear}>
          Clear List
        </button>
      </div>
    </div>
  );
};

export default Details;
