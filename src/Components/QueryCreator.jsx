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
      skills: ["Mining"],
    };

    // 0.5 hours, that is
    this.pollingInterval = 0.5;

    this.defaultViewInterval = 24 * 20;
    this.defaultDisplayedDataPoints = 1000;

    this.numberToQuery = this.defaultViewInterval / this.pollingInterval;
  }

  fetchData = async () => {
    if (!this.state.skills || !this.state.player || !this.state.category) {
      return undefined;
    }
    var url = new URL(
      "https://ti2bowg785.execute-api.us-east-1.amazonaws.com/default/QueryOsrsMetricsDbLambda"
    );
    const query = this.getQuery();
    url.searchParams.append("sql", this.getQuery());

    try {
      const res = await fetch(url);
      const data = await res.json();
      const smoothedData = this.smooth(data);
      this.setState({ queryResult: smoothedData });
    } catch (error) {
      throw error;
    }
  };

  // not a real smooth, more of a thin
  smooth = (data) => {
    if (!Array.isArray(data)) {
      // not our problem
      return data;
    }

    const smoothedData = [];
    const length = data.length;
    const delta = Math.floor(length / this.defaultDisplayedDataPoints);
    if (delta === 0) return data;
    for (let i = 0; i < length; i = i + delta) {
      smoothedData.push(data[i]);
    }

    return smoothedData;
  };

  getQuery = () => {
    return `SELECT timestamp,${this.state.skills} FROM skills.${this.state.category} WHERE player='${this.state.player}' ORDER BY timestamp ASC LIMIT ${this.numberToQuery}`;
  };

  updatePlayer = (player) => {
    this.setState({ player: player.value }, () => this.fetchData());
  };

  updateCategory = (category) => {
    this.setState({ category: category.value }, () => this.fetchData());
  };

  /**
   *
   * We receive skills as value, label pairs
   */
  updateSkills = (skills) => {
    const updatedSkills = [];
    if (skills) {
      skills.forEach((skill) => {
        if (skill.label !== undefined) {
          updatedSkills.push(skill.value);
        }
      });
    }
    this.setState({ skills: updatedSkills }, () => this.fetchData());
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    /**
     * N.B. (trdav):
     * Never remove this queryResult check, or we will get an infinite loop
     */
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
          user={this.state.user}
        ></GraphContainer>
      </div>
    );
  }
}

export default QueryCreator;
