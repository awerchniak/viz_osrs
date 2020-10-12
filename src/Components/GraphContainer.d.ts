import React from "react";
declare class GraphContainer extends React.Component {
    constructor(props: any);
    getAxisYDomain: () => number[];
    getDataPointMinMax(dataPoint: any, currentMin: any, currentMax: any): any[];
    zoom(): void;
    zoomOut(): void;
    formatData: () => any[] | undefined;
    getLines: () => any[] | undefined;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    render(): JSX.Element;
}
export default GraphContainer;
