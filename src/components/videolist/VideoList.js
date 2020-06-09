import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './VideoList.css';
import xmark from '../x.png';
import up from '../up.png';
import down from '../down.png';

class VideoList extends Component {
  upFunction = (x) => {
    if (x !== 0) {
      const y = x - 1;
      this.props.StateStore.swapId(x, y);
      this.props.StateStore.swapTitle(x, y);
    }
  };

  downFunction = (x) => {
    if (x !== this.props.StateStore.idCount - 1) {
      const y = x + 1;
      this.props.StateStore.swapId(x, y);
      this.props.StateStore.swapTitle(x, y);
    }
  };

  closeFunction = (x) => {
    this.props.StateStore.removeVid(x);
  };

  render() {
    const { StateStore } = this.props;
    return StateStore.videoTitle.map((title, i) => (
      <div key={i} className='titleList'>
        <h4>{title}</h4>
        <button
          className='upButton'
          onClick={() => {
            this.upFunction(i);
          }}
        >
          <img src={up} alt='close' />
        </button>
        <button
          onClick={() => {
            this.downFunction(i);
          }}
        >
          <img src={down} alt='close' />
        </button>
        <button
          onClick={() => {
            this.closeFunction(i);
          }}
        >
          <img src={xmark} alt='close' />
        </button>
      </div>
    ));
  }
}

export default inject('StateStore')(observer(VideoList));
