import React from "react";
import "./App.css";
import QueryCreator from "./Components/QueryCreator";
class App extends React.Component {
    render() {
        return (React.createElement("div", { className: "App" },
            React.createElement(QueryCreator, null),
            React.createElement("a", { className: "App-link", href: "https://github.com/awerchniak/viz_osrs", target: "_blank", rel: "noopener noreferrer" }, "Check out our repo!")));
    }
}
export default App;
