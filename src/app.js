import React, { useState } from 'react';
import YoutubeVideo from './components/youtube';
import PlayList from './components/playlist';
import './css/app.css';

//Check url is valid or not
const matchYoutubeUrl = (url) => {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var matches = url.match(p);
    if(matches){
        return matches[1];
    }
    return false;
}

const App = () => {
  const [val, setVal] = useState("");
  const data = localStorage.getItem('list');
  const [list, setList] = useState( data ? JSON.parse(data) : []);

  const addToList = () => {
    const id = matchYoutubeUrl(val);
    const duplicate = list.includes(val);
    setVal("");
    if(id !== false && !duplicate){
      setList([...list, val]);
      //store data in localstorage
      localStorage.setItem('list', JSON.stringify([...list, val]));
    } else if(duplicate){
      alert('Duplicate Entry');
    } else{
      alert('Incorrect URL');
    }
  }

  const updateList = (newList) => {
    setList([...newList]);
    //store data in localstorage
    localStorage.setItem('list', JSON.stringify([...newList]));
  }
  return (
    <div className="app">
      <header className="app-header">
        <input typr="text" value={val} placeholder="type you tube url" onChange={e => setVal(e.target.value)}/>
        <button onClick={() => addToList()} disabled={!val}>Submit</button>
      </header>
      <div className="container">
        <YoutubeVideo list={list} updateList={updateList}/>
        <PlayList list={list} updateList={updateList}/>
      </div>
    </div>
  );
}

export default App;
