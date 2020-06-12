import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";

class Icons extends Component {

    constructor(props){
        super(props);
        this.state = {
            icons: []
        }
    }

    componentDidMount(){
        this.props.getIcons();
    }

    render(){
        return(
            <div className="link-wrapper">
                {
                    this.props.icons.map(({url, icon}, i) => {
                        return (
                            <a href={url} key={i}>
                                <img src={icon} />
                            </a>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        icons: state.icons.icons
    }
}

export default connect(mapStateToProps, actions)(Icons);