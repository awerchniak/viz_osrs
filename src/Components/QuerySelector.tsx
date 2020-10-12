import React from "react";
import Select from "react-select";
import { Category, Player, Skills } from "./Interfaces/DropDownDataFields";

type QuerySelectorState = {
  player: Player;
  category: Category;
  skills: Skills;
};

class QuerySelector extends React.Component<never, QuerySelectorState> {
  constructor(props: never) {
    super(props);
    this.state = {
      player: { label: "ElderPlinius", value: "ElderPlinius" },
      category: { label: "experience", value: "experience" },
      skills: [{ label: "Mining", value: "Mining" }],
      startYear: { label: "2020", value: "2020" },
      startMonth: { label: "August", value: "08" },
      startDay: { label: "20", value: "20" },
      endYear: { label: "2020", value: "2020" },
      endMonth: { label: "August", value: "08" },
      endDay: { label: "27", value: "27" },
    };

    this.playerOptions = [
      { value: "ElderPlinius", label: "ElderPlinius" },
      { value: "Tarvis Devor", label: "Tarvis Devor" },
      { value: "Brec", label: "Brec" },
    ];
    this.categoryOptions = [
      { value: "rank", label: "Rank" },
      { value: "level", label: "Level" },
      { value: "experience", label: "Experience" },
    ];
    this.skillsOptions = [
      { value: "Overall", label: "Overall" },
      { value: "Attack", label: "Attack" },
      { value: "Defence", label: "Defence" },
      { value: "Strength", label: "Strength" },
      { value: "Hitpoints", label: "Hitpoints" },
      { value: "Ranged", label: "Ranged" },
      { value: "Prayer", label: "Prayer" },
      { value: "Magic", label: "Magic" },
      { value: "Cooking", label: "Cooking" },
      { value: "Woodcutting", label: "Woodcutting" },
      { value: "Fletching", label: "Fletching" },
      { value: "Fishing", label: "Fishing" },
      { value: "Firemaking", label: "Firemaking" },
      { value: "Crafting", label: "Crafting" },
      { value: "Smithing", label: "Smithing" },
      { value: "Mining", label: "Mining" },
      { value: "Herblore", label: "Herblore" },
      { value: "Agility", label: "Agility" },
      { value: "Thieving", label: "Thieving" },
      { value: "Slayer", label: "Slayer" },
      { value: "Farming", label: "Farming" },
      { value: "Runecrafting", label: "Runecrafting" },
      { value: "Hunter", label: "Hunter" },
      { value: "Construction", label: "Construction" },
    ];
    this.yearOptions = [{ value: "2020", label: "2020" }];
    this.monthOptions = [
      { value: "01", label: "January" },
      { value: "02", label: "February" },
      { value: "03", label: "March" },
      { value: "04", label: "April" },
      { value: "05", label: "May" },
      { value: "06", label: "June" },
      { value: "07", label: "July" },
      { value: "08", label: "August" },
      { value: "09", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" },
    ];
    this.dayOptions = [
      { value: "01", label: "01" },
      { value: "02", label: "02" },
      { value: "03", label: "03" },
      { value: "04", label: "04" },
      { value: "05", label: "05" },
      { value: "06", label: "06" },
      { value: "07", label: "07" },
      { value: "08", label: "08" },
      { value: "09", label: "09" },
      { value: "10", label: "10" },
      { value: "11", label: "11" },
      { value: "12", label: "12" },
      { value: "13", label: "13" },
      { value: "14", label: "14" },
      { value: "15", label: "15" },
      { value: "16", label: "16" },
      { value: "17", label: "17" },
      { value: "18", label: "18" },
      { value: "19", label: "19" },
      { value: "20", label: "20" },
      { value: "21", label: "21" },
      { value: "22", label: "22" },
      { value: "23", label: "23" },
      { value: "24", label: "24" },
      { value: "25", label: "25" },
      { value: "26", label: "26" },
      { value: "27", label: "27" },
      { value: "28", label: "28" },
      { value: "29", label: "29" },
      { value: "30", label: "30" },
      { value: "31", label: "31" },
    ];
  }

  updatePlayer = (player) => {
    this.setState({ player: player });
    this.props.updatePlayer(player);
  };

  updateCategory = (category) => {
    this.setState({ category: category });
    this.props.updateCategory(category);
  };

  updateSkills = (skills) => {
    this.setState((state) => {
      return {
        skills: skills,
      };
    });
    this.props.updateSkills(skills);
  };

  updateStartYear = (startYear) => {
    this.setState({ startYear: startYear });
    this.props.updateStartYear(startYear);
  };

  updateStartMonth = (startMonth) => {
    this.setState({ startMonth: startMonth });
    this.props.updateStartMonth(startMonth);
  };

  updateStartDay = (startDay) => {
    this.setState({ startDay: startDay });
    this.props.updateStartDay(startDay);
  };

  updateEndYear = (endYear) => {
    this.setState({ endYear: endYear });
    this.props.updateEndYear(endYear);
  };

  updateEndMonth = (endMonth) => {
    this.setState({ endMonth: endMonth });
    this.props.updateEndMonth(endMonth);
  };

  updateEndDay = (endDay) => {
    this.setState({ endDay: endDay });
    this.props.updateEndDay(endDay);
  };

  render() {
    return (
      <div>
        <div>
          <span>Select Username</span>
          <Select
            placeholder="Player"
            value={this.state.player}
            onChange={this.updatePlayer}
            options={this.playerOptions}
          />
        </div>
        <div>
          <span>Select Table</span>
          <Select
            placeholder="Category"
            value={this.state.category}
            onChange={this.updateCategory}
            options={this.categoryOptions}
          />
        </div>
        <div>
          <span>Select Skill(s)</span>
          <Select
            placeholder="Skills"
            value={this.state.skills}
            onChange={this.updateSkills}
            options={this.skillsOptions}
            isMulti={true}
          />
        </div>
        <div>
          <span>Select Start Year for query</span>
          <Select
            placeholder="StartYear"
            value={this.state.startYear}
            onChange={this.updateStartYear}
            options={this.yearOptions}
          />
        </div>
        <div>
          <span>Select Start Month for query</span>
          <Select
            placeholder="StartMonth"
            value={this.state.startMonth}
            onChange={this.updateStartMonth}
            options={this.monthOptions}
          />
        </div>
        <div>
          <span>Select Start Day for query</span>
          <Select
            placeholder="StartDay"
            value={this.state.startDay}
            onChange={this.updateStartDay}
            options={this.dayOptions}
          />
        </div>
        <div>
          <span>Select End Year for query</span>
          <Select
            placeholder="EndYear"
            value={this.state.endYear}
            onChange={this.updateEndYear}
            options={this.yearOptions}
          />
        </div>
        <div>
          <span>Select End Month for query</span>
          <Select
            placeholder="EndMonth"
            value={this.state.endMonth}
            onChange={this.updateEndMonth}
            options={this.monthOptions}
          />
        </div>
        <div>
          <span>Select End Day for query</span>
          <Select
            placeholder="EndDay"
            value={this.state.endDay}
            onChange={this.updateEndDay}
            options={this.dayOptions}
          />
        </div>
      </div>
    );
  }
}

export default QuerySelector;
