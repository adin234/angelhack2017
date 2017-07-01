import React, { Component } from 'react';
import './App.css';

import Login from './Login';
import Chat from './Chat';

import {Div} from 'glamorous';

class App extends Component {
  render() {
    return (
      <Div className="App"
           flex="1"
           display="box"
           flexDirection="column"
           position="relative"
           height="100%"
        >
        <Chat />
        <Login name="test" />
      </Div>
    );
  }
}

export default App;
