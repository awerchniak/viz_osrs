import React from "react";
declare class QuerySelector extends React.Component {
    constructor(props: any);
    updatePlayer: (player: any) => void;
    updateCategory: (category: any) => void;
    updateSkills: (skills: any) => void;
    updateStartYear: (startYear: any) => void;
    updateStartMonth: (startMonth: any) => void;
    updateStartDay: (startDay: any) => void;
    updateEndYear: (endYear: any) => void;
    updateEndMonth: (endMonth: any) => void;
    updateEndDay: (endDay: any) => void;
    render(): JSX.Element;
}
export default QuerySelector;
