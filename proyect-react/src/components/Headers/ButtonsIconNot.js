import React from "react";

export default function ButtonsIconNot() {
  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <a className="nav-link dropdown-toggle" href="/" id="alertsDropdown">
        <i className="fas fa-bell fa-fw"></i>
        <span className="badge badge-danger badge-counter">3+</span>
      </a>
    </li>
  );
}
