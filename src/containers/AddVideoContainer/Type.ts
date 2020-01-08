import { IVideoDetail } from "components/VideoDetail/Type";
import {
  onUrlTextChangeAction,
  toggleUrlErrorAction,
  setListenerAction
} from "./Action";
import { onAddVideoAction } from "containers/VideoPlaylistContainer/Action";
import { IReduxStateModel as IVideoPlaylistState } from "containers/VideoPlaylistContainer/Type";

export const TOGGLE_URL_TEXT_ERROR = "toggle_url_text_error";
export const ON_CHANGE_URL_TEXT = "on_change_url_text";
export const ADD_STORAGE_LISTENER = "add_storage_listener";
export const TOGGLE_META_LOADING = "toggle_meta_loading";
export const ON_VIDEO_META_SUCCESS = "on_video_meta_success";

export interface IReduxStateModel {
  urlText: string;
  isUrlTextError: boolean;
  isMetaLoading: boolean;
  metaData: IVideoDetail | null;
}

export interface IReduxActionModel {
  onUrlTextChangeAction: typeof onUrlTextChangeAction;
  toggleUrlErrorAction: typeof toggleUrlErrorAction;
  onAddVideoAction: typeof onAddVideoAction;
  setListenerAction: typeof setListenerAction;
}

export type IProps = IReduxStateModel & IReduxActionModel & IVideoPlaylistState;
