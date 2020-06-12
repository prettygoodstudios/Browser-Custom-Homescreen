import {combineReducers} from "redux";

import news from "./news";
import weather from "./weather";
import icons from "./icons";
import settings from "./settings";

export default combineReducers({
    news,
    weather,
    icons,
    settings
});