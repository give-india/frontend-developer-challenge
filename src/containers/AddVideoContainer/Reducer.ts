import {
  ON_CHANGE_URL_TEXT,
  TOGGLE_URL_TEXT_ERROR,
  IReduxStateModel,
  TOGGLE_META_LOADING,
  ON_VIDEO_META_SUCCESS
} from "./Type";

const INITIAL_STATE: IReduxStateModel = {
  urlText: "",
  isUrlTextError: false,
  isMetaLoading: false,
  metaData: null
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ON_CHANGE_URL_TEXT:
      return { ...state, urlText: action.payload };
    case TOGGLE_URL_TEXT_ERROR:
      return { ...state, isUrlTextError: action.payload };
    case TOGGLE_META_LOADING:
      return { ...state, isMetaLoading: action.payload };
    case ON_VIDEO_META_SUCCESS:
      return { ...state, metaData: action.payload };
    default:
      return state;
  }
};
