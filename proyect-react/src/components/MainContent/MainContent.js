import React from "react";
import Topbar from "./Topbar";
import PageContent from "./PageContent";

const MainContent = () => {
    return (
        <div id="content">
            <Topbar />
            <PageContent />
        </div>
    );
};

export default MainContent;
