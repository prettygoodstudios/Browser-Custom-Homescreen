import React, {Component} from "react";

import {connect} from "react-redux";

import * as actions from "../actions";

import Modal from "./modal";

const IconForm = (props) => {
    const {url, setUrl, show, setImage, image} = props;
    if(!show){
        return <div></div>
    }
    return(
        <div className="icon-form">
            <input placeholder="URL" className="icon-form__url" value={url} onChange={(e) => setUrl(e)}></input>
            <label>Choose a Image</label>
            <img src={image} accept="image/*"/>
            <input type="file" onChange={setImage}></input>
        </div>
    );
}

class SettingsModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            addIcon: false,
            addIconUrl: "",
            addIconImg: null
        }
    }

    componentDidMount(){
        
    }

    toggleAddIcon = () => {
        this.setState({
            addIcon: !this.state.addIcon
        });
    }

    setAddIconUrl = (e) => {
        const {target} = e;
        this.setState({
            addIconUrl: target.value
        });
    }

    setImage = (e) => {
        console.log(e.target);
        const {target} = e;
        const file = URL.createObjectURL(target.files[0]);
        this.setState({
            addIconImg: file
        });
    }

    render(){
        const {icons} = this.props;
        const {addIcon, addIconUrl, addIconImg} = this.state;
        return(
            <div>
                <Modal title={"Settings"} submitText={"Save"} submit={this.props.toggleSettingsModal} close={this.props.toggleSettingsModal} show={this.props.show}>
                    <h3>Icons</h3>
                    <a onClick={this.toggleAddIcon}>Add a icon</a>
                    <IconForm url={addIconUrl} setUrl={this.setAddIconUrl} show={addIcon} setImage={this.setImage} image={addIconImg}/>
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