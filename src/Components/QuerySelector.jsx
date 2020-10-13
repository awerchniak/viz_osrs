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
    this.BLOCKED_DATES = [
      moment().add(10, 'days'), 
      moment().add(11, 'days'),
      moment().add(12, 'days'), 
    ];

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
      focusedInput: null,
      startDate: moment().subtract(7, 'days'),
      endDate: moment(),
      block: false,
      numMonths: 2,
      minimumNights: 7
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
    this.yearOptions = [
      { value: "2020", label: "2020" },
    ]
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
    ]
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
    ]
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
