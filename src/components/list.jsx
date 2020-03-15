import React from "react";
import ListItem from "./list-item";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as playerActions from "../redux/actions/player.actions";

toast.configure({
  autoClose: 3000,
  draggable: false
});

class List extends React.Component {
  notify = msg =>
    toast(msg, {
      position: toast.POSITION.TOP_RIGHT,
      type: toast.TYPE.WARNING,
      closeButton: false
    });

  componentDidMount() {
    const playList = localStorage.getItem("playlist");
    if (playList) {
      this.props.addPlayList(JSON.parse(playList));
    }
  }

  componentDidUpdate() {
    const { error } = this.props;
    error && this.notify(error);
  }
  render() {
    const { playlist } = this.props;

    return (
      <div className="list">
        {playlist.length > 0
          ? playlist.map((song, index) => (
              <ListItem
                index={index}
                title={Object.values(song)[0]}
                key={index}
              />
            ))
          : "NO VIDEO TO PLAY"}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  addPlayList: playList => dispatch(playerActions.addPlayListToStore(playList))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
