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
  }

  fetchData = async () => {
    if (!this.state.skills || !this.state.player || !this.state.category) {
      return undefined;
    }
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
    return `SELECT timestamp,${this.state.skills} FROM skills.${this.state.category} WHERE player='${this.state.player}' ORDER BY timestamp ASC LIMIT 500`;
  };

  updatePlayer = (player) => {
    this.setState({ player: player.value }, this.fetchData);
  };

  updateCategory = (category) => {
    this.setState({ category: category.value }, this.fetchData);
  };

  updateSkills = (skills) => {
    const updatedSkills = [];
    if (skills) {
      skills.forEach((skill) => {
        if (skill.label !== undefined) {
          updatedSkills.push(skill.value);
        }
      });
    }
    this.setState({ skills: updatedSkills }, this.fetchData);
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
          user={this.state.user}
        ></GraphContainer>
      </div>
    );
  }
}

export default QueryCreator;
