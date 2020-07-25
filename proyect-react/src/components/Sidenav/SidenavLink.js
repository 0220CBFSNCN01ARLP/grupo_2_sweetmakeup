import React from "react";

export default function SidenavLink() {
    return (
        <li className="nav-item active">
            <a className="nav-link" href="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
        </li>
    );
}
