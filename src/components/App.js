import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Searchbar from './Searchbar';
import VideoDetails from './VideoDetails';
import VideoList from './VideoList';
import PlayList from './PlayList';
import { URL } from '../constants/EndPoints';
import { API_KEY } from '../constants/EndPoints';
import './../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      playList: []
    };
    this.videoSearch('saberz');
  }

  videoSearch = async termFromSearchBar => {
    const response = await axios.get(URL, {
      params: {
        part: 'snippet',
        maxResults: 10,
        key: API_KEY,
        q: termFromSearchBar
      }
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  handlePlayList = video => {
    this.setState({
      playList: this.state.playList.concat(video),
      loading: false
    });
  };

  handleRemove = id => {
    let newList = this.state.playList.filter(ar => ar.etag !== id);
    this.setState({
      playList: newList
    });
  };

  handleUpward = id => {
    if (id !== 0) {
      let data = [...this.state.playList];
      let temp = data[id - 1];
      data[id - 1] = data[id];
      data[id] = temp;
      this.setState({
        playList: data
      });
    }
  };

  handleDownward = id => {
    if (id !== this.state.playList.length - 1) {
      let data = [...this.state.playList];
      let temp = data[id + 1];
      data[id + 1] = data[id];
      data[id] = temp;
      this.setState({
        playList: data
      });
    }
  };
  render() {
    const videoSearchDebounce = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    return (
      <div className="App">
        <Searchbar onSearchTermChange={videoSearchDebounce} />
        <VideoDetails
          selectedVideo={this.state.selectedVideo}
          playList={this.state.playList}
        />
        <PlayList
          data={this.state.playList}
          loading={this.state.loading}
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          onVideoRemove={id => this.handleRemove(id)}
          handleUpward={id => this.handleUpward(id)}
          handleDownWard={id => this.handleDownward(id)}
        />

        <VideoList
          videos={this.state.videos}
          // onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          playListData={video => this.handlePlayList(video)}
        />
      </div>
    );
  }
}

export default App;
