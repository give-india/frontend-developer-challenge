import React, { Component } from 'react';
import { connect } from 'react-redux';
import Playlistrow from './playlistrow';
import * as ACTIONS from '../store/actions/actions';

class Playlist extends Component {
    render() {
        return (
            <div>
            <div>
                <h3>Playlist</h3>
                </div>
            <div>
                    {this.props.playlist && this.props.playlist.length>0 &&  this.props.playlist.map(list =>
                    <Playlistrow
                        list={list}
                        key={list}
                    />
                )}
                </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playlist: state.playlist_reducer.playlist
    }
}
function mapDispatchToProps(dispatch) {
    return {
        add_to_playlist: (list) => dispatch(ACTIONS.add_to_playlist(list)),
        clear_playlist: () => dispatch(ACTIONS.clear_playlist()),
        remove_from_playlist: (list) => dispatch(ACTIONS.remove_from_playlist(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);