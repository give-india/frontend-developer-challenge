import React from "react";
import YouTube from "react-youtube";
import "./style.css";

import { LinkEntry } from "../../App";
import crossIcon from "../../assets/cross-icon.svg";

interface PlayAndQueueProps {
  entry: LinkEntry[];
  children: any;
}
interface PQCardProps {
  entry: LinkEntry;
  onRemove: (id: number) => void;
}

export const PlayAndQueue: React.FC<PlayAndQueueProps> = (
  props: PlayAndQueueProps
) => {
  const { entry, children } = props;

  const opts = {
    height: "800",
    width: "1100",
    PlayerVars: {
      autoplay: 1,
    },
  };


  const yid = entry[0].link.split("v=")[1].substring(0, 11); 

  return (
    <div className="playqueue-main">
      <div className="play-video">
        {entry && <YouTube videoId={yid} opts={opts} />}
      </div>
      <div className="play-queue">{children}</div>
    </div>
  );
};

export const PQCard: React.FC<PQCardProps> = (props: PQCardProps) => {
  const {
    entry: { link, id },
    onRemove,
  } = props;

  const onRemoveTask = () => onRemove(id);

  return (
    <div className="play-card">
      <div className="card-header">
        <div className="link-title">{link}</div>
      </div>
      <div className="remove-button">
        <button className="remove-link-btn" onClick={onRemoveTask}>
          <img src={crossIcon} className="remove-task-icon" alt="delete task" />
        </button>
      </div>
    </div>
  );
};
