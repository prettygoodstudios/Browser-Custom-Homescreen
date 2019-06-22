import React, {Component} from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import reducers from "../reducers";

import NewsFeed from "./newsFeed";
import Weather from "./weather";

const store = createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <div>
                    <Weather />
                    <NewsFeed />
                </div>
            </Provider>
        )
    }
}