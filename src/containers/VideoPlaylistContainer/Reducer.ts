import {
  IReduxStateModel,
  ON_ADD_VIDEO,
  ON_END_VIDEO,
  ON_SEEK_TO,
  ON_REMOVE_VIDEO
} from "./Type";

const INITIAL_STATE: IReduxStateModel = {
  videoList: [],
  videoListDetail: {},
  currentVideo: "",
  seekTo: 0
};

export default (state = INITIAL_STATE, action: any) => {
  console.log(action);
  switch (action.type) {
    case ON_ADD_VIDEO:
      return {
        ...state,
        videoList: action.payload.videoList,
        videoListDetail: action.payload.videoListDetail,
        currentVideo: state.currentVideo
          ? state.currentVideo
          : action.payload.videoList[0]
      };
    case ON_END_VIDEO:
      return {
        ...state,
        videoList: action.payload.videoList,
        currentVideo: action.payload.currentVideo
      };
    case ON_SEEK_TO:
      return { ...state, seekTo: action.payload };
    case ON_REMOVE_VIDEO:
      return { ...state, videoList: action.payload };
    default:
      return state;
  }
};
