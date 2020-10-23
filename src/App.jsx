import React from "react";
import "./App.css";
import QueryCreator from "./Components/QueryCreator";

class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ dislpay: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1 style={{ marginBottom: "60px" }}> Old School Runescape Stats Visualizer</h1>
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
