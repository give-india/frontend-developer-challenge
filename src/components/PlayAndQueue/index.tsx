import React from 'react';
import "./style.css";

export const PlayAndQueue: React.FC = () => {
  return (
    <div className="playqueue-main">
         <div className = "play-video">
              <h1>play screen</h1>
         </div>
         <div className = "play-queue">
              <h1>play queue</h1>
         </div>
    </div>
  );
}

