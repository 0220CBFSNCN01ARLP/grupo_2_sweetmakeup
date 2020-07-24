import React from "react";
import ButtonsIconNot from "./ButtonsIconNot";
import ButtonsIconMsg from "./ButtonsIconMsg";
import Profile from "./Profile";

export default function Header() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      <ul className="navbar-nav ml-auto">
        <ButtonsIconNot />
        <ButtonsIconMsg />

        <div className="topbar-divider d-none d-sm-block"></div>

        <Profile />
      </ul>
    </nav>
  );
}
