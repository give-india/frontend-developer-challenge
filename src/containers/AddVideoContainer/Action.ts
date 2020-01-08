import { IVideoDetail } from "components/VideoDetail/Type";
import {
  TOGGLE_URL_TEXT_ERROR,
  ON_CHANGE_URL_TEXT,
  ADD_STORAGE_LISTENER,
  TOGGLE_META_LOADING,
  ON_VIDEO_META_SUCCESS
} from "./Type";
import { parseVideoId, YOUTUBE_META_URL } from "utils";

export const onUrlTextChangeAction = (text: string): any => {
  return (dispatch: any) => {
    dispatch({
      type: ON_CHANGE_URL_TEXT,
      payload: text
    });
    let videoId = parseVideoId(text);
    if (!videoId) {
      dispatch(toggleUrlErrorAction(true));
      dispatch(onMetaFetchSuccess(null));
    } else {
      dispatch(toggleUrlErrorAction(false));
      dispatch(fetchMetaAction(text));
    }
  };
};

export const fetchMetaAction = (url: string): any => {
  return async (dispatch: any) => {
    dispatch(toggleLoadingMeta(true));
    let response = await fetch(`${YOUTUBE_META_URL}?url=${url}`);
    let resJson = await response.json();
    if (resJson === "Not Found") {
      dispatch(toggleUrlErrorAction(true));
      dispatch(onMetaFetchSuccess(null));
    } else {
      let { thumbnail_url, author_name, title, author_url } = JSON.parse(
        resJson
      );
      let videoDetail: any = {
        thumbnail_url,
        author_name,
        title,
        author_url
      };
      dispatch(onMetaFetchSuccess(videoDetail));
    }
    dispatch(toggleLoadingMeta(false));
  };
};

export const toggleLoadingMeta = (isLoading: boolean) => {
  return {
    type: TOGGLE_META_LOADING,
    payload: isLoading
  };
};

export const toggleUrlErrorAction = (isError: boolean) => {
  return {
    type: TOGGLE_URL_TEXT_ERROR,
    payload: isError
  };
};

export const onMetaFetchSuccess = (videoDetail: IVideoDetail | null) => {
  return {
    type: ON_VIDEO_META_SUCCESS,
    payload: videoDetail
  };
};

export const setListenerAction = () => {
  return {
    type: ADD_STORAGE_LISTENER
  };
};
