import React, { Component } from "react";
import "./AddVideoContainer.scss";
import { connect } from "react-redux";
import { IReduxStateModel, IProps, IReduxActionModel } from "./Type";
import {
  onUrlTextChangeAction,
  toggleUrlErrorAction,
  setListenerAction
} from "./Action";
import { onAddVideoAction } from "containers/VideoPlaylistContainer/Action";
import { Loader, VideoDetail } from "components";
import { parseVideoId } from "utils";
import { IReduxStateModel as IVideoPlaylistState } from "containers/VideoPlaylistContainer/Type";

class AddVideoContainer extends Component<IProps, {}> {
  componentDidMount() {
    this.props.setListenerAction();
  }

  onChangeText = (event: any) => {
    this.props.onUrlTextChangeAction(event.target.value);
  };

  handleSubmit = () => {
    const {
      onAddVideoAction,
      urlText,
      metaData,
      videoList,
      videoListDetail,
      onUrlTextChangeAction
    } = this.props;
    onAddVideoAction(
      parseVideoId(urlText) as string,
      metaData,
      videoList,
      videoListDetail
    );
    onUrlTextChangeAction("");
  };

  render() {
    const { urlText, isUrlTextError, isMetaLoading, metaData } = this.props;
    return (
      <div className="add-video-block">
        <input
          placeholder={"Please Enter a valid URL"}
          value={urlText}
          onChange={this.onChangeText}
        />
        {isMetaLoading && <Loader />}
        {metaData && (
          <div>
            <VideoDetail videoDetail={metaData} />
          </div>
        )}
        {isUrlTextError && urlText && <p className="danger">URL is invalid!</p>}
        {!isMetaLoading && !isUrlTextError && urlText && (
          <button onClick={this.handleSubmit} className="btn">
            Add to Queue
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  addVideo,
  playerlist
}: {
  addVideo: IReduxStateModel;
  playerlist: IVideoPlaylistState;
}) => {
  return { ...addVideo, ...playerlist };
};

const mapDispatchToProps: IReduxActionModel = {
  onUrlTextChangeAction,
  toggleUrlErrorAction,
  onAddVideoAction,
  setListenerAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoContainer);
