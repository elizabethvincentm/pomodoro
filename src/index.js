import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Clock from "./Clock";
import Quotes from "./Quotes";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app">
        <Clock />
        <Quotes />
        <div id="footer"> &copy; Elizabeth Vincent M</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
