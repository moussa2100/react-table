import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ProTableDemo2 from "./test/11";

import HomePage from "./views/Components/BuComponents/HomePage/Index";

export const App = () => {
  return <HomePage />;
  // return <ProTableDemo2 />;
};
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
