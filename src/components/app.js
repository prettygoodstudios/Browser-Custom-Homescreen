import React, {Component} from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import reducers from "../reducers";
import githubIcon from "../images/github.png";
import playIcon from "../images/music.png";
import youtubeIcon from "../images/youtube.png";
import driveIcon from "../images/drive.png";

import NewsFeed from "./newsFeed";
import Weather from "./weather";


const store = createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <div>
                    <div className="header-wrapper">
                        <Weather />
                        <div className="link-wrapper">
                            <a href="https://www.github.com/prettygoodstudios">
                                <img src={githubIcon} />
                            </a>
                            <a href="https://www.youtube.com">
                                <img src={youtubeIcon} />
                            </a>
                            <a href="https://play.google.com/music/listen?u=0">
                                <img src={playIcon} />
                            </a>
                            <a href="https://drive.google.com/drive/u/0/my-drive">
                                <img src={driveIcon} />
                            </a>
                        </div>
                    </div>
                    <NewsFeed />
                </div>
            </Provider>
        )
    }
}