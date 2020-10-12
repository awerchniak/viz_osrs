import { __awaiter } from "tslib";
import React from "react";
import "../App.css";
import GraphContainer from "./GraphContainer";
import QuerySelector from "./QuerySelector";
class QueryCreator extends React.Component {
    constructor(props) {
        super(props);
        this.defaultDisplayedDataPoints = 1000;
        this.infoPopulated = () => {
            return (!!this.state.skills &&
                !!this.state.player &&
                !!this.state.category &&
                !!this.state.startYear &&
                !!this.state.startMonth &&
                !!this.state.startDay &&
                !!this.state.endYear &&
                !!this.state.endMonth &&
                !!this.state.endDay);
        };
        this.fetchData = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.infoPopulated()) {
                this.setState({ queryResult: undefined });
            }
            const url = new URL("https://ti2bowg785.execute-api.us-east-1.amazonaws.com/default/QueryOsrsMetricsDbLambda");
            url.searchParams.append("sql", this.getQuery());
            const res = yield fetch(url.toString());
            if (!res.ok) {
                throw Error(`Invalid response: ${res.statusText}`);
            }
            const data = yield res.text();
            const smoothedData = this.smooth(data);
            this.setState({ queryResult: smoothedData });
        });
        // not a real smooth, more of a thin
        this.smooth = (data) => {
            if (!Array.isArray(data)) {
                // not our problem
                throw Error("Invalid response object; check query format.");
            }
            const smoothedData = [];
            const length = data.length;
            const delta = Math.floor(length / this.defaultDisplayedDataPoints);
            if (delta === 0)
                return data;
            for (let i = 0; i < length; i = i + delta) {
                smoothedData.push(data[i]);
            }
            return smoothedData;
        };
        this.getQuery = () => {
            return `SELECT timestamp,${this.state.skills} FROM skills.${this.state.category} WHERE player='${this.state.player}' AND timestamp > '${this.state.startYear}-${this.state.startMonth}-${this.state.startDay} 00:00:00' AND timestamp < '${this.state.endYear}-${this.state.endMonth}-${this.state.endDay} 23:59:59' ORDER BY timestamp ASC`;
        };
        this.updatePlayer = (player) => {
            this.setState({ player: player.value }, () => this.fetchData());
        };
        this.updateCategory = (category) => {
            this.setState({ category: category.value }, () => this.fetchData());
        };
        /**
         *
         * We receive skills as value, label pairs
         */
        this.updateSkills = (skills) => {
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
        this.updateStartYear = (startYear) => {
            this.setState({ startYear: startYear.value }, () => this.fetchData());
        };
        this.updateStartMonth = (startMonth) => {
            this.setState({ startMonth: startMonth.value }, () => this.fetchData());
        };
        this.updateStartDay = (startDay) => {
            this.setState({ startDay: startDay.value }, () => this.fetchData());
        };
        this.updateEndYear = (endYear) => {
            this.setState({ endYear: endYear.value }, () => this.fetchData());
        };
        this.updateEndMonth = (endMonth) => {
            this.setState({ endMonth: endMonth.value }, () => this.fetchData());
        };
        this.updateEndDay = (endDay) => {
            this.setState({ endDay: endDay.value }, () => this.fetchData());
        };
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
        return (React.createElement("div", null,
            React.createElement(QuerySelector, { updatePlayer: this.updatePlayer, updateCategory: this.updateCategory, updateSkills: this.updateSkills, updateStartYear: this.updateStartYear, updateStartMonth: this.updateStartMonth, updateStartDay: this.updateStartDay, updateEndYear: this.updateEndYear, updateEndMonth: this.updateEndMonth, updateEndDay: this.updateEndDay }),
            React.createElement("button", { onClick: this.fetchData }, "Refresh"),
            React.createElement(GraphContainer, { skills: this.state.skills, data: this.state.queryResult, category: this.state.category, user: this.state.user })));
    }
}
export default QueryCreator;
