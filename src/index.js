import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";
import styles from "./styles/main.scss";

window.onload = () => {
    const wrapper = document.getElementById('app-wrapper');
    ReactDOM.render(<App />, wrapper);
}