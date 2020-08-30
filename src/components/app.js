import React, {Component} from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import reducers from "../reducers";

import NewsFeed from "./newsFeed";
import Weather from "./weather";
import Icons from "./icons";
import Footer from "./footer";
import SettingsModal from "./settingsModal";


import {updateFeedDB, updateIconDB} from "../helpers/db";


const store = createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

store.subscribe(() => {
    updateIconDB(store.getState().icons.icons);
    updateFeedDB(store.getState().news.feeds);
});

export default class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <div>
                    <div className="above-fold">
                        <div className="header-wrapper">
                            <Weather />
                            <Icons />
                        </div>
                        <NewsFeed />
                    </div>
                    <Footer />
                    <SettingsModal />
                </div>
            </Provider>
        )
    }
}