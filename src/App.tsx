import React from "react";
import "./App.css";
import QueryCreator from "./Components/QueryCreator";

class App extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <QueryCreator></QueryCreator>
        <a
          className="App-link"
          href="https://github.com/awerchniak/viz_osrs"
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
