import React, {Component} from "react";
import {connect} from "react-redux";


import {getIconsFromDB} from "../helpers/db"; 
import * as actions from "../actions";

class Icons extends Component {

    componentDidMount(){
        this.props.setIcons(getIconsFromDB());
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