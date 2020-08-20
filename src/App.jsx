import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
    };
  }

  refreshData = () => {
    var url = new URL(
      "https://ti2bowg785.execute-api.us-east-1.amazonaws.com/default/QueryOsrsMetricsDbLambda?sql=SELECT+timestamp%2CSmithing%2CMining+from+skills.experience+ORDER+BY+timestamp+DESC+LIMIT+10"
    );
    // var searchParams = new URLSearchParams(url.search);
    // searchParams.set(
    //   "sql",
    //   "SELECT timestamp,Smithing,Mining from skills.experience ORDER BY timestamp DESC LIMIT 10"
    // );
    fetch(url)
      .then((res) => res.json())
      .then((_data) => {
        this.setState({ data: _data }, () =>
          console.log("successfully fetched data", _data)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.refreshData();
  }

  render() {
    const data = JSON.stringify(this.state.data);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Here's some data</p>
          <p>{data}</p>
          <a
            className="App-link"
            href="https://https://github.com/awerchniak/viz_osrs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check out our repo!
          </a>
        </header>
        <button onClick={this.refreshData}>Refresh</button>
      </div>
    );
  }
}

export default App;
