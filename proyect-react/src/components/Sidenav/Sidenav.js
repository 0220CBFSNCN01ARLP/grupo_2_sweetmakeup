import React from "react";
import SidenavBrand from "./SidenavBrand";
import SidenavDivider from "./SidenavDivider";
import SidenavLink from "./SidenavLink";
import SidenavTitle from "./SidenavTitle";

export default function Sidenav() {
    return (
        <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" 
            id="accordionSidebar"
        >
            <SidenavBrand />
            <SidenavDivider />
            <SidenavLink
                active
                label="Dashboard"
                icon="fa-tachometer-alt"
                link="/dashboard"
            />
            <SidenavDivider />
            <SidenavTitle label="Actions" />
            <SidenavLink label="Pages" icon="fa-folder" link="/pages" />
            <SidenavLink label="Charts" icon="fa-chart-area" link="/charts" />
            <SidenavLink label="Tables" icon="fa-table" link="/tables" />
            <SidenavDivider />
        </ul>
    );
}
