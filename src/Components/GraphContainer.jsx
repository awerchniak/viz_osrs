import deepEqual from "deep-equal";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const initialState = {
  data: [{ timeStamp: 0, Magic: 0 }],
  left: "dataMin",
  right: "dataMax",
  top: "dataMax+1000000",
  bottom: "dataMin-1000000",
  animation: true,
};

class GraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.skillColorMap = new Map()
    this.skillColorMap.set('Overall', '#000000')
    this.skillColorMap.set('Attack', '#E74C3C')
    this.skillColorMap.set('Defence', '#5DADE2')
    this.skillColorMap.set('Strength', '#808080')
    this.skillColorMap.set('Hitpoints', '#641E16')
    this.skillColorMap.set('Ranged', '#2ECC71')
    this.skillColorMap.set('Prayer', '#F4D03F')
    this.skillColorMap.set('Magic', '#99A3A4')
    this.skillColorMap.set('Cooking', '#BB8FCE')
    this.skillColorMap.set('Woodcutting', '#7E5109')
    this.skillColorMap.set('Fletching', '#1ABC9C')
    this.skillColorMap.set('Fishing', '#1B4F72')
    this.skillColorMap.set('Firemaking', '#F39C12')
    this.skillColorMap.set('Crafting', '#AF601A')
    this.skillColorMap.set('Smithing', '#797D7F')
    this.skillColorMap.set('Mining', '#65EDF1')
    this.skillColorMap.set('Herblore', '#EFF165')
    this.skillColorMap.set('Agility', '#4B0082')
    this.skillColorMap.set('Thieving', '#4A235A')
    this.skillColorMap.set('Slayer', '#17202A')
    this.skillColorMap.set('Farming', '#A9DFBF')
    this.skillColorMap.set('Runecrafting', '#E74C3C')
    this.skillColorMap.set('Hunter', '#DC7633')
    this.skillColorMap.set('Construction', '#E1C699')
  }

  getAxisYDomain = () => {
    let bottom;
    let top;

    switch (this.props.category) {
      case "experience":
        bottom = 1000;
        top = 10000;
        break;
      case "level":
        bottom = 1;
        top = 99;
        this.setState({ bottom, top });
        return [bottom, top];
      case "rank":
        bottom = -1;
        top = 100000;
        break;
      default:
        throw new Error("Unknown category");
    }

    this.state.data.forEach((dataPoint) => {
      let [tempBottom, tempTop] = this.getDataPointMinMax(
        dataPoint,
        bottom,
        top
      );

      if (tempBottom < bottom) bottom = tempBottom;
      if (tempTop > top) top = tempTop;
    });

    const rangeOffset = (top - bottom) / 10;
    bottom = bottom - rangeOffset;
    top = top + rangeOffset;

    this.setState({ bottom, top });
    return [bottom, top];
  };

  getDataPointMinMax(dataPoint, currentMin, currentMax) {
    let min = currentMin;
    let max = currentMax;
    let keys = Object.keys(dataPoint);
    keys.forEach((key) => {
      if (key !== "timeStamp") {
        const value = dataPoint[key];
        if (value < min) min = value;
        if (value > max) max = value;
      }
    });

    return [min, max];
  }

  formatData = () => {
    if (
      this.props.data &&
      this.props.skills &&
      Array.isArray(this.props.data)
    ) {
      const newArray = [];
      this.props.data.forEach((dataPoint) => {
        const processedDataPoint = {};

        // Convert timestamp to local time and prettify
        // TODO: break out into separate method
        const timeStamp = new Date(Date.parse(dataPoint[0].replace(" ", "T")));
        timeStamp.setHours(timeStamp.getHours() - timeStamp.getTimezoneOffset() / 60);
        const formattedDate = timeStamp.toDateString();
        const [, month, day, year] = formattedDate.split(' ');
        const formattedTime = timeStamp.toTimeString();
        const [time, , ] = formattedTime.split(' ');
        const [hour, minute, second] = time.split(':');

        // processedDataPoint.timeStamp = `${day}-${month}-${year} ${hour}:${minute}:${second}`;
        processedDataPoint.timeStamp = `${month} ${day}`;
        
        let index = 1;
        this.props.skills.forEach((skill) => {
          processedDataPoint[skill] = dataPoint[index];
          index = index + 1;
        });
        newArray.push(processedDataPoint);
      });
      return newArray;
    }

    return undefined;
  };

  getLines = () => {
    const lines = [];
    if (this.props.skills === undefined) {
      return undefined;
    }

    this.props.skills.forEach((skill) => {
      lines.push(
        <Line
          yAxisId="1"
          type="natural"
          dataKey={skill}
          stroke={this.skillColorMap.get(skill)}
          animationDuration={300}
          dot={false}
        />
      );
    });

    return lines;
  };

  componentDidMount() {
    const formattedDataObject = this.formatData();
    this.setState({ data: formattedDataObject });
  }

  componentDidUpdate(prevProps) {
    if (
      !deepEqual(prevProps.data, this.props.data) ||
      !deepEqual(prevProps.user, this.props.user) ||
      !deepEqual(prevProps.category, this.props.category)
    ) {
      const formattedDataObject = this.formatData();
      this.setState({ data: formattedDataObject }, () => {
        this.getAxisYDomain();
      });
    }
  }

  render() {
    const {
      data,
      left,
      right,
      top,
      bottom,
    } = this.state;

    return (
      <div className="highlight-bar-charts" style={{ userSelect: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <LineChart
          width={800}
          height={400}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow={true}
            dataKey="timeStamp"
            domain={[left, right]}
            type="category"
          />
          <YAxis
            allowDataOverflow={true}
            domain={["0", top]}
            type="number"
            yAxisId="1"
            scale="log"
            width={100}
          />
          <Tooltip />
          {this.getLines()}
        </LineChart>
      </div>
    );
  }
}

export default GraphContainer;
