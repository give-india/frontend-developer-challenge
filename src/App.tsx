import React from 'react';
import "./App.css";

import { AddLink } from './components/AddLink'
import { PlayAndQueue } from './components/PlayAndQueue'

const App: React.FC = () => {
  return (
    <div className="App">
         <div className = "link">
              <AddLink />
         </div>
         <div className = "queue">
               <PlayAndQueue />
         </div>
    </div>
  );
}

export default App;
