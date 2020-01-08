import { IVideoDetail } from "components/VideoDetail/Type";
import {
  ON_ADD_VIDEO,
  ON_END_VIDEO,
  ON_SEEK_TO,
  ON_REMOVE_VIDEO
} from "./Type";

export const onAddVideoAction = (
  videoId: string,
  videoDetail: IVideoDetail | null,
  videoList: string[],
  videoListDetail: { [key: string]: IVideoDetail | null }
) => {
  let newVideoList = videoList.concat([videoId]);
  let newVideoListDetail = { ...videoListDetail };
  newVideoListDetail[videoId] = videoDetail;
  return {
    type: ON_ADD_VIDEO,
    payload: { videoList: newVideoList, videoListDetail: newVideoListDetail }
  };
};

export const onVideoEndedAction = (videoList: string[]): any => {
  return (dispatch: any) => {
    dispatch({
      type: ON_END_VIDEO,
      payload: {
        videoList,
        currentVideo: ""
      }
    });
    videoList.shift();
    let newVideoList = [...videoList];
    dispatch({
      type: ON_END_VIDEO,
      payload: {
        videoList: newVideoList,
        currentVideo: newVideoList[0] ? newVideoList[0] : ""
      }
    });
  };
};

export const onSeekVideoAction = (played: number) => {
  return {
    type: ON_SEEK_TO,
    payload: played
  };
};

export const onRemoveVideoAction = (
  index: number,
  videoList: string[]
): any => {
  return (dispatch: any) => {
    if (index === 0) {
      dispatch(onVideoEndedAction(videoList));
    } else {
      let newVideoList = [
        ...videoList.slice(0, index),
        ...videoList.slice(index + 1)
      ];
      dispatch({ type: ON_REMOVE_VIDEO, payload: newVideoList });
    }
  };
};
