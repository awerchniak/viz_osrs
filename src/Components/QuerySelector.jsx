import React from "react";
import Select from "react-select";


import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap/scss/bootstrap.scss'; // for better fonts and form styles to demo with

import { DateRangePicker } from 'react-dates';

class QuerySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: { label: "ElderPlinius", value: "ElderPlinius" },
      category: { label: "experience", value: "experience" },
      skills: [
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
      ],
      focusedInput: null,
      startDate: moment().subtract(7, 'days'),
      endDate: moment(),
      block: false,
      numMonths: 2,
      minimumNights: 7
    };

    this.playerOptions = [
      { value: "ElderPlinius", label: "ElderPlinius" },
      { value: "Brec", label: "Brec" },
      { value: "IronDethaele", label: "IronDethaele" },
      { value: "IronPlinius", label: "IronPlinius" },
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
  }

  /**
   * START:
   *
   * Highly experimental section
   */

  handleDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
    this.props.updateDates(startDate, endDate);
  }

  handleFocusChange = (focusedInput) => {
    this.setState({ focusedInput });
  }

  handleIsOutsideRange = (day) => {
    return day.isBefore('2020-8-15') || day.isAfter(moment());
  }

   /**
   * END:
   *
   * Highly experimental section
   */

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
        <div style={{ marginTop: '15px', marginBottom: '15px'}}>
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={this.handleDatesChange} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired,
            displayFormat={'MM/DD/YYYY'}
            hideKeyboardShortcutsPanel={true}
            numberOfMonths={this.state.numMonths || 2}
            block={this.state.block}
            isOutsideRange={this.handleIsOutsideRange}
            initialVisibleMonth={() => moment().subtract(1, 'months')}
          />
        </div>
      </div>
    );
  }
}

export default QuerySelector;
