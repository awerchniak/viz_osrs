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
  data: undefined,
  left: "dataMin",
  right: "dataMax",
  refAreaLeft: "",
  refAreaRight: "",
  top: "dataMax+1",
  bottom: "dataMin-1",
  animation: true,
};

class GraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getAxisYDomain = (from, to, ref, offset) => {
    let data;
    if (this.props.data !== undefined) {
      data = this.props.data;
    } else {
      data = [{ timeStamp: 0, Magic: 0 }];
    }
    const refData = data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset];
  };

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
    const [bottom, top] = this.getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      "Magic",
      1
    );

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
    const { data } = this.state;
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
    if (this.props.data !== undefined && Array.isArray(this.props.data)) {
      const newArray = [];
      this.props.data.forEach((dataPoint) => {
        const processedDataPoint = {};
        processedDataPoint.timeStamp = dataPoint[0];
        let index = 1;
        this.props.skills.forEach((skill) => {
          console.log("logging skill");
          console.log(skill);
          processedDataPoint[skill] = dataPoint[index];
          console.log("logging processedDataPoint");
          console.log(processedDataPoint);
          index += 1;
        });
        newArray.push(processedDataPoint);
      });
      return newArray;
    }

    return undefined;
  };

  componentDidMount() {
    const formattedDataObject = this.formatData();
    this.setState({ data: formattedDataObject });
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(prevProps.data, this.props.data)) {
      const formattedDataObject = this.formatData();
      console.log("logging formattedDataObject");
      console.log(formattedDataObject);
      this.setState({ data: formattedDataObject });
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
          <Line
            yAxisId="1"
            type="natural"
            dataKey="Magic"
            stroke="#8884d8"
            animationDuration={300}
          />

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
