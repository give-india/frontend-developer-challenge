import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

import * as ACTIONS from '../store/actions/actions';
import Playlist from './playlist';

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    componentWillMount() {
        let playlist = localStorage.getItem('playlist');
        let currentItem = localStorage.getItem('current_track');
        let newPlaylist = playlist ? playlist.split(",") : null;
        newPlaylist && this.props.add_to_playlist(newPlaylist);
        newPlaylist && this.props.set_current_track(currentItem);
    }

    matchYoutubeUrl(url) {
        let youtubeRegex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        let matches = url.match(youtubeRegex);
        if (matches) {
            return true;
        } else {
            return false;
        }
    }

    onClearAll() {
        this.props.clear_playlist();
        this.props.set_current_track(null);
        localStorage.removeItem('playlist');
        localStorage.removeItem('curret_track');
    }

    addLinkToProps = (link) => {
        let newLink = link.split("watch?v=")[1];
        this.props.set_current_track(newLink);
        this.props.playlist ? !this.props.playlist.some(list => list == newLink) && this.props.add_to_playlist([newLink, ...this.props.playlist]) : this.props.add_to_playlist([newLink]);
        this.setState({ error: null });
    }

    onAddLinkClick = () => {
        let link = document.getElementById('urllink').value;
        this.matchYoutubeUrl(link) ? 
          this.addLinkToProps(link)
            : this.setState({ error: "Enter a Valid Link" });
    }

    onLinkError = () => {
        this.setState({ error: "Enter a Valid Link" });
    }

    onVideoReady = () => {
        this.setState({ error: null });
    }

    onVideoEnd = () => {
        let newPlaylist = this.props.playlist.filter(list => list != this.props.current_track);
        newPlaylist && newPlaylist.length > 0 && this.props.set_current_track(newPlaylist[0]);
        this.props.remove_from_playlist(newPlaylist);
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <input type="text" name="Enter the Youtube Url to play" id="urllink" />
                        <button onClick={() => this.onAddLinkClick()}> Submit </button>
                        <button onClick={() => this.onClearAll()}> Clear Playlist </button>
                        <div>
                            {this.state.error}
                        </div>
                    </div>
                    <div>
                        {this.props.playlist && this.props.playlist.length > 0 && !this.state.error &&

                            <ReactPlayer
                                url={"https://www.youtube.com/watch?v=" + this.props.current_track.toString()}
                                onError={() => this.onLinkError()}
                                onReady={() => this.onVideoReady()}
                                controls
                                onEnded={() => this.onVideoEnd()}
                            />
                        }
                    </div>
                </div>
                <div style={{ float: 'right' }}>
                    <Playlist />
                </div>
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
        add_to_playlist: (list) => dispatch(ACTIONS.add_to_playlist(list)),
        clear_playlist: () => dispatch(ACTIONS.clear_playlist()),
        remove_from_playlist: (list) => dispatch(ACTIONS.remove_from_playlist(list)),
        set_current_track: (url) => dispatch(ACTIONS.set_current_track(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);