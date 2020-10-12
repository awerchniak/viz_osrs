import React from "react";
import "../App.css";
declare type QueryCreatorState = {
    queryResult?: string;
    player: string | undefined;
    category: string | undefined;
    skills: string[];
    startYear: string | undefined;
    startMonth: string | undefined;
    startDay: string | undefined;
    endYear: string | undefined;
    endMonth: string | undefined;
    endDay: string | undefined;
};
declare class QueryCreator extends React.Component<never, QueryCreatorState> {
    defaultDisplayedDataPoints: number;
    constructor(props: never);
    infoPopulated: () => boolean;
    fetchData: () => Promise<void>;
    smooth: (data: string) => string[];
    getQuery: () => string;
    updatePlayer: (player: any) => void;
    updateCategory: (category: any) => void;
    /**
     *
     * We receive skills as value, label pairs
     */
    updateSkills: (skills: any) => void;
    updateStartYear: (startYear: any) => void;
    updateStartMonth: (startMonth: any) => void;
    updateStartDay: (startDay: any) => void;
    updateEndYear: (endYear: any) => void;
    updateEndMonth: (endMonth: any) => void;
    updateEndDay: (endDay: any) => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export default QueryCreator;
