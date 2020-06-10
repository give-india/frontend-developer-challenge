import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './SearchBar.css';

var youtubeUrl = require('youtube-url');

class SearchBar extends Component {
  state = {
    url: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.url);
    if (youtubeUrl.valid(this.state.url)) {
      const id = this.state.url.split('=');
      this.props.StateStore.addId(id[1]);
    } else window.alert('Please enter a valid Youtube URL and try again.');
    this.setState({ url: '' });
  };

  render() {
    return (
      <div className='container'>
        <form className='form-inline searchBar' onSubmit={this.handleSubmit}>
          <input
            type='text'
            className='form-control-plaintext inputBox mb-2 pl-3'
            placeholder='Enter the Youtube URL'
            value={this.state.url}
            onChange={(event) => this.setState({ url: event.target.value })}
            required
          />
          <button type='submit' className='btn btn-light mb-2 searchButton'>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default inject('StateStore')(observer(SearchBar));
