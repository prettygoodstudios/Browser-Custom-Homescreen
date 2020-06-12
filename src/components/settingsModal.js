import React, {Component} from "react";

import {connect} from "react-redux";

import * as actions from "../actions";

import Modal from "./modal";

class SettingsModal extends Component{

    render(){
        const {icons} = this.props;
        return(
            <div>
                <Modal title={"Settings"} submitText={"Save"} submit={this.props.toggleSettingsModal} close={this.props.toggleSettingsModal} show={this.props.show}>
                    <h3>Icons</h3>
                    <a>Add a icon</a>
                    <ul className="icon-settings">
                        {
                            icons.map(({url, icon}, i) => {
                                return(
                                    <li key={i}>
                                        <img src={icon}/>
                                        {url}
                                        <a>Edit</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Modal>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        show: state.settings.settingsModal,
        icons: state.icons.icons
    }
}


export default connect(mapStateToProps, actions)(SettingsModal);