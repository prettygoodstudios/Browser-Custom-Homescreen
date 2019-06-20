import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";


window.onload = () => {
    const wrapper = document.getElementById('app-wrapper');
    ReactDOM.render(<App />, wrapper);
}