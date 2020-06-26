import React from 'react';
import './App.css';
import SimpleFileUpload from './components/SimpleFileUpload'
import CreateWord from './components/CreateWord'

function App() {
  return (
    <div className="App">
      <CreateWord/>
      <SimpleFileUpload/>
    </div>
  );
}

export default App;
