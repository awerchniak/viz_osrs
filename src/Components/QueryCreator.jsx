import React from "react";
import "../App.css";
import { render } from "react-dom";

class QueryCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
    };
  }

  refreshData = async () => {
    var url = new URL(
      "https://ti2bowg785.execute-api.us-east-1.amazonaws.com/default/QueryOsrsMetricsDbLambda"
    );
    url.searchParams.append(
      "sql",
      "SELECT timestamp,Smithing,Mining from skills.experience ORDER BY timestamp DESC LIMIT 10"
    );

    try {
      const res = await fetch(url);
      const data = await res.json();
      this.setState({ data: data }, () => {
        console.log("logging data");
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  };

  componentDidMount() {
    this.refreshData();
  }

  render() {
    const data = JSON.stringify(this.state.data);
    return (
      <div>
        <p>{data}</p>
        <button onClick={this.refreshData}>Refresh</button>
      </div>
    );
  }
}

export default QueryCreator;
