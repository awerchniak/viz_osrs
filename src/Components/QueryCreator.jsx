import React from "react";
import "../App.css";
import { render } from "react-dom";
import GraphContainer from "./GraphContainer";
import QuerySelector from "./QuerySelector";

class QueryCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      queryResult: undefined,
      player: "ElderPlinius",
      category: "experience",
      skills: ["Magic"],
    };
  }

  fetchData = async () => {
    var url = new URL(
      "https://ti2bowg785.execute-api.us-east-1.amazonaws.com/default/QueryOsrsMetricsDbLambda"
    );
    const query = this.getQuery();
    console.log(query);
    url.searchParams.append("sql", this.getQuery());

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      this.setState({ queryResult: data });
    } catch (error) {
      throw error;
    }
  };

  getQuery = () => {
    console.log(this.state.skills);
    return `SELECT timestamp,${this.state.skills} FROM skills.${this.state.category} WHERE player='${this.state.player}' ORDER BY timestamp ASC LIMIT 500`;
  };

  updatePlayer = (player) => {
    this.setState({ player: player }, this.fetchData);
  };

  updateCategory = (category) => {
    this.setState({ category: category }, this.fetchData);
  };

  updateSkills = (skills) => {
    this.setState({ skills: skills }, this.fetchData);
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    if (this.state.queryResult === undefined) {
      this.fetchData();
    }
  }

  render() {
    return (
      <div>
        <QuerySelector
          updatePlayer={this.updatePlayer}
          updateCategory={this.updateCategory}
          updateSkills={this.updateSkills}
        ></QuerySelector>
        <button onClick={this.fetchData}>Refresh</button>
        <GraphContainer
          skills={this.state.skills}
          data={this.state.queryResult}
          category={this.state.category}
        ></GraphContainer>
      </div>
    );
  }
}

export default QueryCreator;
