import React, { Component } from 'react';
import InputTab from './InputTab';
import VideoPlayer from './VideoPlayer';
import VideoList from './VideoList';
import '../style.css';
import { connect } from 'react-redux';
import { updateStore } from '../actions';
import { loadState } from '../localStorage';

class App extends Component {
    componentDidMount() {
        //code updates state from once tab is visible
        window.addEventListener(visibilityChange, () => {
            if (document[visibilityState] === 'visible') {
                this.props.updateStore(loadState());
            }
        });
    }
    render() {
        return (
            <div className="app">
                <InputTab />
                <div className="video-wrapper">
                    <VideoPlayer />
                    <VideoList />
                </div>
            </div>
        );
    }
}

//code to set visibility type according to browsers
let visibilityState, visibilityChange;

if (typeof document.hidden !== "undefined") {
    visibilityChange = "visibilitychange";
    visibilityState = "visibilityState";
}
else if (typeof document.mozHidden !== "undefined") {
    visibilityChange = "mozvisibilitychange";
    visibilityState = "mozVisibilityState";
}
else if (typeof document.msHidden !== "undefined") {
    visibilityChange = "msvisibilitychange";
     visibilityState = "msVisibilityState";
}
else if (typeof document.webkitHidden !== "undefined") {
    visibilityChange = "webkitvisibilitychange";
     visibilityState = "webkitVisibilityState";
}

export default connect(null, { updateStore })(App);

