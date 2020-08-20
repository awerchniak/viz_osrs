import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  // eslint-disable-next-line
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Here's some data`</p>
          <a
            className="App-link"
            href="https://https://github.com/awerchniak/viz_osrs.org"
            target="_blank"
            rel="noopener noreferrer">
            Check out our repo!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
