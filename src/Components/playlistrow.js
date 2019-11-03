import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../store/actions/actions';

class PlaylistRow extends Component {

    removeFromPlaylist() {
        let playlist = this.props.playlist.filter(list => list !== this.props.list);
        if (this.props.current_track == this.props.list.toString()) {
            if (playlist.length > 0) {
                this.props.set_current_track(playlist[0]);
            } else {
                this.props.set_current_track(null);
            }
        }
        this.props.remove_from_playlist(playlist);
    }

    render() {
        return (
            <div>
                <button>
                <button
                    onClick={() => this.props.set_current_track(this.props.list.toString())}>
                    <img
                        src={"https://img.youtube.com/vi/" + this.props.list.toString() + "/hqdefault.jpg"}
                    />
                    </button>
                    <button onClick={() => this.removeFromPlaylist()} >X</button>
                    </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playlist: state.playlist_reducer.playlist,
        current_track: state.playlist_reducer.current_track
    }
}
function mapDispatchToProps(dispatch) {
    return {
        set_current_track: (url) => dispatch(ACTIONS.set_current_track(url)),
        remove_from_playlist: (list) => dispatch(ACTIONS.remove_from_playlist(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistRow);