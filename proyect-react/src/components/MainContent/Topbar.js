import React from "react";

import TopbarItem from "./TopbarItem";
import TopbarDivider from "./TopbarDivider";
import TopbarProfileMenu from "./TopbarProfileMenu";

const Topbar = () => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
            >
                <i className="fa fa-bars"></i>
            </button>

            <ul className="navbar-nav ml-auto">
                <TopbarItem />

                <TopbarItem />

                <TopbarDivider />

                <TopbarProfileMenu />
            </ul>
        </nav>
    );
};

export default Topbar;
