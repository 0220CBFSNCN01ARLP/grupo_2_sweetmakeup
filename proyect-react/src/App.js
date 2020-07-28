import React from "react";
import "./App.css";
import Sidenav from "./components/Sidenav/Sidenav";
import Content from "./components/Content";

function App() {
  return (
    <div id="wrapper">
      <Sidenav />
      <Content />
    </div>
  );
}

export default App;
