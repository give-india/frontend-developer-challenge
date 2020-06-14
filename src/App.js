import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList/TodoList';
import VideoPlayer from './VideoPlayer/VideoPlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList/>
        <VideoPlayer/>
      </header>
    </div>
  );
}

export default App;
