import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "react-dom";
import QueryCreator from "./Components/QueryCreator";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <QueryCreator></QueryCreator>
        <a
          className="App-link"
          href="https://https://github.com/awerchniak/viz_osrs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out our repo!
        </a>
      </div>
    );
  }
}

export default App;
