import React from 'react';
import List from './list';

const PlayList = ({ list, updateList }) => {
  return (
    <div className="playlist-wrapper">
      <div className="title">PlayList</div>
        <div className="list-view">
          <List items={list} updateList={updateList}/> 
        </div>
    </div>
  );
}

export default PlayList;
