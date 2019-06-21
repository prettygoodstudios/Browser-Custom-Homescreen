import React, {Component} from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import reducers from "../reducers";
import NewsFeed from "./newsFeed";

const store = createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <div>
                    <h1>Miguel's Dashboard</h1>
                    <p>Hello Yall 3.0</p>
                    <NewsFeed />
                </div>
            </Provider>
        )
    }
}