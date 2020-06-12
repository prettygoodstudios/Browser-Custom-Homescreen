import React, {Component} from 'react';
import {connect} from "react-redux";

import * as actions from "../actions";

class Footer extends Component {
    render(){
        return(
            <div className="footer">
                <div className="footer__title">
                    Browser Home Screen - Miguel Rust &copy; 2020 
                </div>
                <a className="footer__settings" onClick={() => alert("Settings")}>
                    Settings
                </a>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {

    }
}

export default connect(mapStateToProps, actions)(Footer);