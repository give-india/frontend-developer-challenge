import React from 'react';
import './App.css';
import Youtube from './Youtube';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
library.add(faTrash)

function App() {
  return (
    <div className="Youbtube">
      <Youtube/>
    </div>
  );
}
export default App;
