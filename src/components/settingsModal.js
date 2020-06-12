import React, {Component} from "react";

import {connect} from "react-redux";

import * as actions from "../actions";

import Modal from "./modal";

class SettingsModal extends Component{

    render(){
        return(
            <div>
                <Modal title={"Settings"} submitText={"Save"} submit={() => alert("submit")} close={() => alert("close")} show={false}>
                    <h1>Settings</h1>
                </Modal>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{

    }
}


export default connect(mapStateToProps, actions)(SettingsModal);