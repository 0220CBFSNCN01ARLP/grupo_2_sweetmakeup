import React from "react";
import SidenavBrand from "./SidenavBrand";
import SidenavDivider from "./SidenavDivider";
import SidenavLink from "./SidenavLink";
import SidenavTitle from "./SidenavTitle";
import SidenavLinkPages from "./SidenavLinkPages";
import SidenavLinkCharts from "./SidenavLinkCharts";
import SidenavLinkTables from "./SidenavLinkTables";

export default function Sidenav() {
    return (
        <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            <SidenavBrand />
            <SidenavDivider />
            <SidenavLink label="Dashboard" active icon="fa-tachometer-alt" />
            <SidenavDivider />
            <SidenavTitle label="Actions" />
            <SidenavLinkPages label="Pages" active icon="fa-folder" />
            <SidenavLinkCharts label="Charts" active icon="fa-chart-area" />
            <SidenavLinkTables label="Tables" active icon="fa-table" />
            <SidenavDivider />
        </ul>
    );
}