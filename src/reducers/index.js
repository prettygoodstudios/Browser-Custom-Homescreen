import {combineReducers} from "redux";

import news from "./news";
import weather from "./weather";

export default combineReducers({
    news,
    weather
});