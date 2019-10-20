import {connect} from 'react-redux';
import AddTrack from '../components/addTrack';
import {addTrack} from '../store/actions/';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (url, count) => {
      dispatch (addTrack (url, count));
    },
  };
};

let AddTrackHOC = connect (mapStateToProps, mapDispatchToProps) (AddTrack);

export {AddTrackHOC};
