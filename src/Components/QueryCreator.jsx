import React from "react";
import "../App.css";
import { render } from "react-dom";
import QuerySelector from "./QuerySelector";

class QueryCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      dataBaseQuery: undefined,
      player: undefined,
      category: undefined,
      skills: [],
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
      this.setState({ dataBaseQuery: data }, () => {
        console.log("logging data");
        console.log(data);
      });
    } catch (error) {
      throw error;
    }
  };

  // parseData = () => {
  //   // TODO
  //   const someNewData = undefined;
  //   this.setState({ data: someNewData });
  // };

  updatePlayer = (player) => {
    this.setState({ player: player });
  };

  updateCategory = (category) => {
    this.setState({ category: category });
  };

  updateSkills = (skills) => {
    this.setState({ skills: skills });
  };

  componentDidMount() {
    this.refreshData();
  }

  render() {
    // const data = this.parseData();
    return (
      <div>
        <QuerySelector
          updatePlayer={this.updatePlayer}
          updateCategory={this.updateCategory}
          updateSkills={this.updateSkills}
        ></QuerySelector>
        {/* <GraphContainer>{data}</GraphContainer> */}
        <button onClick={this.refreshData}>Refresh</button>
      </div>
    );
  }
}

export default QueryCreator;
