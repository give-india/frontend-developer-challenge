import React from 'react';
import './App.css';
import LinkInput from "./components/linkInput";
import Video from "./components/video";
import Links from "./components/links";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      youtubeLinks: localStorage.getItem('videoLinks') ? localStorage.getItem('videoLinks') : []
    }
  }

  getAllLink = () => {
    const linksArray = JSON.parse(localStorage.getItem('videoLinks'));
    this.setState({youtubeLinks: linksArray});
  }

  handleEnd = () => {
    const linksArray = JSON.parse(localStorage.getItem('videoLinks'));
    linksArray.shift();
    this.updateStorage(linksArray);
  }

  handleRemoveLink = (linkNumber) => {
    const linksArray = JSON.parse(localStorage.getItem('videoLinks'));
    linksArray.splice(linkNumber, 1);
    console.log(linksArray);
    this.updateStorage(linksArray);
  }

  updateStorage = (linksArray) => {
    localStorage.setItem("videoLinks", JSON.stringify(linksArray));
    this.setState({youtubeLinks: linksArray});
  }

  render() {
    const {youtubeLinks} = this.state;
    return (
      <div className="App">
        <div className="container">
          <div className="row my-2">
            <LinkInput getLinks={this.getAllLink} />
          </div>
          <div className="row">
            <div className="col-8 p-0">
              <Video videoUrl={youtubeLinks[0]} sendEnd={this.handleEnd} />
            </div>
            <div className="col-4 p-0">
              <Links linksList={youtubeLinks} sendUpdate={(linkNumber) => this.handleRemoveLink(linkNumber)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
