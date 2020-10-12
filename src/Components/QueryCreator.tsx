import React from "react";
import "../App.css";
import { render } from "react-dom";
import GraphContainer from "./GraphContainer";
import QuerySelector from "./QuerySelector";

type QueryCreatorState = {
  queryResult?: string[];
  player: string | undefined;
  category: string | undefined;
  skills: string[];
  startYear: string | undefined;
  startMonth: string | undefined;
  startDay: string | undefined;
  endYear: string | undefined;
  endMonth: string | undefined;
  endDay: string | undefined;
};

class QueryCreator extends React.Component<never, QueryCreatorState> {
  defaultDisplayedDataPoints: number = 1000;

  constructor(props: never) {
    super(props);
    this.state = {
      queryResult: undefined,
      player: "ElderPlinius",
      category: "experience",
      skills: ["Mining"],
      startYear: "2020",
      startMonth: "08",
      startDay: "20",
      endYear: "2020",
      endMonth: "August",
      endDay: "27",
    };
  }

  infoPopulated = (): boolean => {
    return (
      !!this.state.skills &&
      !!this.state.player &&
      !!this.state.category &&
      !!this.state.startYear &&
      !!this.state.startMonth &&
      !!this.state.startDay &&
      !!this.state.endYear &&
      !!this.state.endMonth &&
      !!this.state.endDay
    );
  };

  fetchData = async (): Promise<void> => {
    if (!this.infoPopulated()) {
      this.setState({ queryResult: undefined });
    }
    const url: URL = new URL(
      "https://fakeLambda"
    );

    url.searchParams.append("sql", this.getQuery());
    const res: Response = await fetch(url.toString());
    if (!res.ok) {
      throw Error(`Invalid response: ${res.statusText}`);
    }

    const data: string = await res.text();
    const smoothedData: string[] = this.smooth(data);
    this.setState({ queryResult: smoothedData });
  };

  // not a real smooth, more of a thin
  smooth = (data: string): string[] => {
    if (!Array.isArray(data)) {
      // not our problem
      throw Error("Invalid response object; check query format.");
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

  getQuery = (): string => {
    return `SELECT timestamp,${this.state.skills} FROM skills.${this.state.category} WHERE player='${this.state.player}' AND timestamp > '${this.state.startYear}-${this.state.startMonth}-${this.state.startDay} 00:00:00' AND timestamp < '${this.state.endYear}-${this.state.endMonth}-${this.state.endDay} 23:59:59' ORDER BY timestamp ASC`;
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

  updateStartYear = (startYear) => {
    this.setState({ startYear: startYear.value }, () => this.fetchData());
  };

  updateStartMonth = (startMonth) => {
    this.setState({ startMonth: startMonth.value }, () => this.fetchData());
  };

  updateStartDay = (startDay) => {
    this.setState({ startDay: startDay.value }, () => this.fetchData());
  };

  updateEndYear = (endYear) => {
    this.setState({ endYear: endYear.value }, () => this.fetchData());
  };

  updateEndMonth = (endMonth) => {
    this.setState({ endMonth: endMonth.value }, () => this.fetchData());
  };

  updateEndDay = (endDay) => {
    this.setState({ endDay: endDay.value }, () => this.fetchData());
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    qu;
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
          updateStartYear={this.updateStartYear}
          updateStartMonth={this.updateStartMonth}
          updateStartDay={this.updateStartDay}
          updateEndYear={this.updateEndYear}
          updateEndMonth={this.updateEndMonth}
          updateEndDay={this.updateEndDay}
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
