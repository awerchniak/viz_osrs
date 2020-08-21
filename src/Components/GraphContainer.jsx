import deepEqual from "deep-equal";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
} from "recharts";

const initialState = {
  data: [{ timeStamp: 0, Magic: 0 }],
  left: "dataMin",
  right: "dataMax",
  refAreaLeft: "",
  refAreaRight: "",
  top: "dataMax+1000000",
  bottom: "dataMin-1000000",
  animation: true,
};

class GraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
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

  zoom() {
    let { refAreaLeft, refAreaRight, data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      this.setState(() => ({
        refAreaLeft: "",
        refAreaRight: "",
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = this.getAxisYDomain();

    this.setState(() => ({
      refAreaLeft: "",
      refAreaRight: "",
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }));
  }

  zoomOut() {
    let { data } = this.state;

    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      bottom: "dataMin",
    }));
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
        processedDataPoint.timeStamp = dataPoint[0];
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
          stroke="#8884d8"
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
      refAreaLeft,
      refAreaRight,
      top,
      bottom,
    } = this.state;

    return (
      <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
        <button className="btn update" onClick={this.zoomOut.bind(this)}>
          Zoom Out
        </button>

        <LineChart
          width={800}
          height={400}
          data={data}
          onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
          onMouseMove={(e) =>
            this.state.refAreaLeft &&
            this.setState({ refAreaRight: e.activeLabel })
          }
          onMouseUp={this.zoom.bind(this)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="timeStamp"
            domain={[left, right]}
            type="category"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
          />
          <Tooltip />
          {this.getLines()}

          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </div>
    );
  }
}

export default GraphContainer;
