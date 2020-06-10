import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './App.css';
import SearchBar from './components/searchbar/SearchBar';
import VideoList from './components/videolist/VideoList';
import VideoPlayer from './components/videoplayer/VideoPlayer';
import logo from './youtube.png';

class App extends Component {
  render() {
    const { StateStore } = this.props;
    return (
      <div className='container-fluid'>
        {/* <div>
          <img src={logo} alt='youtube' className='text-center' />
          <h1 className='p-3 text-center'>
            <strong>Youtube Player</strong>
          </h1>
        </div> */}
        <h1 className='p-3 text-center'>
          <img src={logo} alt='youtube' className='p-2' />
          <strong>Youtube Player</strong>
        </h1>
        <SearchBar />
        <div>
          {StateStore.idCount > 0 ? (
            <div className='row'>
              <div className='col-lg-7 text-center'>
                <VideoPlayer />
              </div>
              <div className='col-lg-5'>
                <VideoList />
              </div>{' '}
            </div>
          ) : (
            <h1 className='text-center p-3'>
              Enter Youtube URL to start watching!
            </h1>
          )}
        </div>
      </div>
    );
  }
}

export default inject('StateStore')(observer(App));
