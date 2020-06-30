import React from 'react';
import './App.css';
//import SimpleFileUpload from './components/SimpleFileUpload';
//import CreateWord from './components/CreateWord';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import CreateWord from './components/CreateWord';
import UpdateWord from './components/UpdateWord';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/words/create" component={CreateWord} />
        <Route exact path="/words/:id" component={UpdateWord} />
      </Switch>
    </div>
  );
}

export default App;
