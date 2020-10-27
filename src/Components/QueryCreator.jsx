import React from "react";
import "../App.css";
import GraphContainer from "./GraphContainer";
import QuerySelector from "./QuerySelector";
import moment from 'moment';

class QueryCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      queryResult: undefined,
      player: "ElderPlinius",
      category: "experience",
      skills: [
          "Overall",
          "Attack",
          "Defence",
          "Strength",
          "Hitpoints",
          "Ranged",
          "Prayer",
          "Magic",
          "Cooking",
          "Woodcutting",
          "Fletching",
          "Fishing",
          "Firemaking",
          "Crafting",
          "Smithing",
          "Mining",
          "Herblore",
          "Agility",
          "Thieving",
          "Slayer",
          "Farming",
          "Runecrafting",
          "Hunter",
          "Construction",
      ],
      startYear: "2020",
      startMonth: "08",
      startDay: "20",
      endYear: "2020",
      endMonth: "August",
      endDay: "27",
      formattedStartDate: this.formatISODate(moment().subtract(7, 'days').format()),
      formattedEndDate: this.formatISODate(moment().format()),
    };

    this.defaultDisplayedDataPoints = 1000;
  }

  fetchData = async () => {
    var url = new URL(
      "https://ti2bowg785.execute-api.us-east-1.amazonaws.com/default/QueryOsrsMetricsDbLambda"
    );
    
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
    return `SELECT timestamp,${this.state.skills} FROM skills.${this.state.category} WHERE player='${this.state.player}' AND timestamp > '${this.state.formattedStartDate} 00:00:00' AND timestamp < '${this.state.formattedEndDate} 23:59:59' ORDER BY timestamp ASC`;
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

  updateDates = (startDate, endDate) => {

    const formattedStartDate = this.formatISODate(startDate.format());
    const formattedEndDate = this.formatISODate(endDate.format());
    this.setState({formattedStartDate, formattedEndDate});
  }

  formatISODate(date) {
    return date.slice(0, 10);
  }

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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr"}}>
        <div style={{ gridColumn: "1 / 2" }}>
          <QuerySelector
            updatePlayer={this.updatePlayer}
            updateCategory={this.updateCategory}
            updateSkills={this.updateSkills}
            updateDates={this.updateDates}
          ></QuerySelector>
        </div>
        <div style={{ gridColumn: "2 / 3", padding: "15px" }}>
          <GraphContainer
            skills={this.state.skills}
            data={this.state.queryResult}
            category={this.state.category}
            user={this.state.user}
          ></GraphContainer>
          <button style={{ margin: "40px"}} onClick={this.fetchData}>Refresh</button>
        </div>
      </div>
    );
  }
}

export default QueryCreator;
