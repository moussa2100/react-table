import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import ReactTableComponent from "./views/homePage";

export const App = () => {
  return <ReactTableComponent />;
};
ReactDOM.render(<App />, document.getElementById("app"));
