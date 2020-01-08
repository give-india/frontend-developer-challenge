import {
  onVideoEndedAction,
  onSeekVideoAction,
  onRemoveVideoAction
} from "./Action";

export interface IVideoDetail {
  thumbnail_url: string;
  title: string;
  author_url: string;
  author_name: string;
}

export interface IReduxStateModel {
  videoList: string[];
  videoListDetail: { [key: string]: IVideoDetail };
  currentVideo: string;
  seekTo: number;
}

export interface IReduxActionModel {
  onVideoEndedAction: typeof onVideoEndedAction;
  onSeekVideoAction: typeof onSeekVideoAction;
  onRemoveVideoAction: typeof onRemoveVideoAction;
}

export type IProps = IReduxStateModel & IReduxActionModel;

export const ON_ADD_VIDEO = "on_add_video";
export const ON_END_VIDEO = "on_end_video";
export const ON_SEEK_TO = "on_seek_to";
export const ON_REMOVE_VIDEO = "on_remove_video";
