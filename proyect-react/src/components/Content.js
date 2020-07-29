import React from "react";

import Footer from "./Footer";
import MainContent from "./MainContent/MainContent";

export default function Content() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <MainContent />
            <Footer />
        </div>
    );
}
