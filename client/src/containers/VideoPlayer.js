import {connect} from 'react-redux';
import VideoPlayer from '../components/videoPlayer';
import {deleteTrack} from '../store/actions/';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch (deleteTrack (id));
    },
  };
};

let VideoPlayerHOC = connect (mapStateToProps, mapDispatchToProps) (
  VideoPlayer
);

export {VideoPlayerHOC};
