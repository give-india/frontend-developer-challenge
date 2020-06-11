import React, { Component } from "react";

class LinkInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            youtubeLink: ""
        }
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter") {
          const youtubePattern = "^(https?://)?(www.)?(youtube.com|youtu.?be)/.+$";
          const youtubeLink = this.state.youtubeLink;
          const videoLinks = JSON.parse(localStorage.getItem('videoLinks'));
          if(youtubeLink.match(youtubePattern) && !videoLinks) {
            localStorage.setItem('videoLinks', JSON.stringify([youtubeLink]));
            this.props.getLinks();
          }
          else {
            videoLinks.push(youtubeLink);
            localStorage.setItem("videoLinks", JSON.stringify(videoLinks));
            this.props.getLinks();
          }
        }
    }
    
    handleInputChange = (e) => {
        this.setState({youtubeLink: e.target.value});
    }

    render() {
        return (
            <div className="w-100">
                <input type="text" className="w-100" placeholder="Enter the YouTube URL" onKeyDown={this.handleKeyPress} onChange={this.handleInputChange} value={this.state.youtubeLink} />
            </div>
        )
    }
}

export default LinkInput;