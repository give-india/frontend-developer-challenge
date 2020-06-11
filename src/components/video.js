import React, { Component } from "react";
import ReactPlayer from 'react-player'

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if(ReactPlayer.canPlay(nextProps.videoUrl)) {
            this.setState({videoUrl: nextProps.videoUrl})
        }
        else if(!nextProps.videoUrl) {
            alert("No URL's found, please enter new URL");
        }
        else {
            alert("Not a correct URL");
        }
    }

    handleSeekMouseUp = (e) => {
        console.log(e.target.value);
    }

    render() {
        return (
                <ReactPlayer 
                url={this.state.videoUrl}
                playing={true} 
                controls={true}
                onEnded={this.props.sendEnd} 
                onMouseUp={(e) => this.handleSeekMouseUp(e)}
                />
        )
    }
}

export default Video;