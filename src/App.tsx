import Home from 'pages/Home';
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const App = () => {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Home />
      </DndProvider>
    </div>
  );
};

export default App;
