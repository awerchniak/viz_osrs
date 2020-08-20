import React from "react";
import Select from "react-select";

class QuerySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: "ElderPlinius",
      category: "experience",
      skills: ["Mining"],
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
      { value: "Ruencrafting", label: "Ruencrafting" },
      { value: "Hunter", label: "Hunter" },
      { value: "Construction", label: "Construction" },
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
    this.setState({ skills: skills });
    this.props.updateSkills(skills);
  };

  render() {
    return (
      <div>
        <Select
          defaultValue={this.state.player}
          defaultInputValue={this.state.player}
          value={this.state.player}
          onChange={this.updatePlayer}
          options={this.playerOptions}
        />
        <Select
          defaultValue={this.state.category}
          defaultInputValue={this.state.category}
          value={this.state.category}
          onChange={this.updateCategory}
          options={this.categoryOptions}
        />
        <Select
          defaultValue={this.state.skills}
          defaultInputValue={this.state.skills}
          value={this.state.skills}
          onChange={this.updateSkills}
          options={this.skillsOptions}
          isMulti={true}
        />
      </div>
    );
  }
}

export default QuerySelector;
