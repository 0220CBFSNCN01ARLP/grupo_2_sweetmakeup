import React from "react";
import "./App.css";
import Sidenav from "./components/Sidenav/Sidenav";
import Header from "./components/Headers/Header";
import Dashboard from "./components/Content/Dashboard";

function App() {
  return (
    <div id="wrapper">
      <Sidenav />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
