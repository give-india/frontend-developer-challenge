import {connect} from 'react-redux';
import TrackList from '../components/trackList';
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

let TrackListHOC = connect (mapStateToProps, mapDispatchToProps) (TrackList);

export {TrackListHOC};
