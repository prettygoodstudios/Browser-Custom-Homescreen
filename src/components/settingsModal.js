import React, {Component} from "react";

import {connect} from "react-redux";

import * as actions from "../actions";

import Modal from "./modal";

const IconForm = (props) => {
    const {url, setUrl, show, setImage, image, save, cancel} = props;
    if(!show){
        return <div></div>
    }
    return(
        <div className="icon-form">
            <input placeholder="URL" className="icon-form__url" value={url} onChange={(e) => setUrl(e)}></input>
            <label>Choose a Image</label>
            <img src={image} accept="image/*"/>
            <input type="file" onChange={setImage}></input>
            <a onClick={save}>Add</a>
            <a onClick={cancel}>Cancel</a>
        </div>
    );
}

class SettingsModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            addIcon: false,
            addIconUrl: "",
            addIconImg: null,
            editIconImg: null,
            editIconUrl: ""
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

    setEditIconUrl = (e) => {
        const {target} = e;
        this.setState({
            editIconUrl: target.value
        });
    }

    addIcon = () => {
        this.props.addIcon(this.state.addIconUrl, this.state.addIconImg);
        this.setState({
            addIconUrl: "",
            addIconImg: null
        });
        this.toggleAddIcon();
    }

    setImage = (e) => {
        const {target} = e;
        const file = URL.createObjectURL(target.files[0]);
        this.setState({
            addIconImg: file
        });
    }

    updateIcon = (id) => {
        this.props.updateIcon(id, this.state.addIconUrl, this.state.addIconImg);
        this.setState({
            editIconUrl: "",
            editIconImg: null
        });
        this.toggleAddIcon();
    }

    setEditImage = (e) => {
        const {target} = e;
        const file = URL.createObjectURL(target.files[0]);
        this.setState({
            editIconImg: file
        });
    }

    render(){
        const {icons, editIcon} = this.props;
        const {addIcon, addIconUrl, addIconImg, editIconUrl, editIconImg} = this.state;
        return(
            <div>
                <Modal title={"Settings"} submitText={"Save"} submit={this.props.toggleSettingsModal} close={this.props.toggleSettingsModal} show={this.props.show}>
                    <h3>Icons</h3>
                    <a onClick={this.toggleAddIcon}>Add a icon</a>
                    <IconForm url={addIconUrl} setUrl={this.setAddIconUrl} show={addIcon} setImage={this.setImage} image={addIconImg} save={this.addIcon} cancel={this.toggleAddIcon}/>
                    <ul className="icon-settings">
                        {
                            icons.map(({url, icon, editing}, i) => {
                                return(
                                    <li key={i}>
                                        <img src={icon}/>
                                        {url}
                                        <a onClick={() => editIcon(i)}>Edit</a>
                                        <IconForm url={editIconUrl} setUrl={this.setEditIconUrl} show={icons[i].editing} setImage={this.setEditImage} image={editIconImg} save={() => this.updateIcon(i)}/>
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