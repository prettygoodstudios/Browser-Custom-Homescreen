import React, {Component} from "react";

import {connect} from "react-redux";

import * as actions from "../actions";

import Modal from "./modal";
import { getBase64Image } from "../helpers/image";

const IconForm = (props) => {
    const {url, setUrl, show, setImage, image, save, cancel, submitText} = props;
    if(!show){
        return <div></div>
    }
    return(
        <div className="icon-form">
            <input placeholder="URL" className="icon-form__url" value={url} onChange={(e) => setUrl(e)}></input>
            <label>Choose a Image</label>
            <img src={image} accept="image/*"/>
            <input type="file" onChange={setImage}></input>
            <a onClick={save}>{submitText}</a>
            <a onClick={cancel}>Cancel</a>
        </div>
    );
}

const FeedForm = (props) => {
    const {sources, selectedSources, save, cancel, submitText, query, country, sortBy, date, feedName, updateField} = props;

    const formSources = {};

    sources.forEach(source => {
        formSources[source.id] = source;
        formSources[source.id].selected = false;
    });

    selectedSources.forEach(source => {
        formSources[source.id].selected = true;
    });

    return(
        <div className="feed-form">
            <input placeholder="Name" className="feed-form__input" value={feedName} onChange={e => updateField("feedName", e)}></input>
            <input type="checkbox" className="feed-form__checkbox" id="feedFormQueryCheckbox" onChange={e => updateField("query", true, e)}/>
            <label htmlFor="feedFormQueryCheckbox">Filter articles by query string</label>
            {query !== false &&
                 <input placeholder="Query" className="feed-form__input" value={query} onChange={e => updateField("query", e)}></input>
            }
            <br />
            <input type="checkbox" className="feed-form__checkbox" id="feedFormCountryCheckbox" onChange={e => updateField("country", true, e)}/>
            <label htmlFor="feedFormCountryCheckbox">Filter articles by country</label>
            {country !== false &&
                <input placeholder="Country" className="feed-form__input" value={country} onChange={e => updateField("country", e)}/>
            }
            <h3>Feeds</h3>
            <div className="feed-form__source-checkboxes">
                <div key="-1" className="feed-form__source-checkboxes__group">
                    <input type="checkbox" value="everything"></input>
                    <label>Everything</label>
                </div>
                <div key="-2" className="feed-form__source-checkboxes__group">
                    <input type="checkbox" value="topheadlines"></input>
                    <label>Top Headlines</label>
                </div>
                {   Object.values(formSources).map((source, i) => {
                        const {name, id, description, country, category} = source;
                        return (
                            <div key={i} className="feed-form__source-checkboxes__group">
                                <input type="checkbox" value={id}></input>
                                <label>{name}</label>
                                <div className="feed-form__source-checkboxes__group__info">
                                    {description}
                                    <span className="group-info-label">Country: {country.toUpperCase()}</span>
                                    <span className="group-info-label">Category: {category}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="feed-form__action-btns">
                <button className="feed-form__action-btns__cancel" onClick={cancel}>Cancel</button>
                <button className="feed-form__action-btns__submit" onClick={save}>{submitText}</button>
            </div>
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
            editIconUrl: "",
            newFeedForm: {
                feedName: "",
                country: false,
                query: false,
                selectedSources: []
            }
        }
    }

    componentDidMount(){
        this.props.getSources();
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
        getBase64Image(target.files[0]).then((imageData) => {
            this.setState({
                addIconImg: "data:image/png;base64,"+imageData
            });
        });
    }

    updateIcon = (id) => {
        this.props.updateIcon(id, this.state.editIconUrl, this.state.editIconImg);
        this.setState({
            editIconUrl: "",
            editIconImg: null
        });
    }

    setEditImage = (e) => {
        const {target} = e;
        getBase64Image(target.files[0]).then((imageData) => {
            this.setState({
                editIconImg: "data:image/png;base64,"+imageData
            });
        });
    }

    cancelEdit = () => {
        this.setState({
            editIconUrl: "",
            editIconImg: null
        });
        this.props.cancelEditIcon();
    }

    edit = (i) => {
        this.props.editIcon(i);
        this.setState({
            editIconImg: this.props.icons[i].icon,
            editIconUrl: this.props.icons[i].url
        });
    }

    updateNewFeedForm = (field, event, toggle = false) => {
        if(!toggle){
            const {value} = event.target;
            this.state.newFeedForm[field] = value;
        }else{
            this.state.newFeedForm[field] = toggle.target.checked ? "" : false;
        }
        this.setState({
            newFeedForm: this.state.newFeedForm
        });
    }

    render(){
        const {icons, sources} = this.props;
        const {addIcon, addIconUrl, addIconImg, editIconUrl, editIconImg, newFeedForm} = this.state;
        return(
            <div>
                <Modal title={"Settings"} submitText={"Save"} submit={this.props.toggleSettingsModal} close={this.props.toggleSettingsModal} show={this.props.show}>
                    <h3>Icons</h3>
                    <a onClick={this.toggleAddIcon}>Add a icon</a>
                    <IconForm url={addIconUrl} setUrl={this.setAddIconUrl} show={addIcon} setImage={this.setImage} image={addIconImg} save={this.addIcon} cancel={this.toggleAddIcon} submitText="Add"/>
                    <FeedForm sources={sources} selectedSources={[]} submitText="Add" feedName={newFeedForm.feedName} country={newFeedForm.country} query={newFeedForm.query} updateField={this.updateNewFeedForm}/>
                    <ul className="icon-settings">
                        {
                            icons.map(({url, icon, editing}, i) => {
                                return(
                                    <li key={i}>
                                        <div className="icon-settings__view-well">
                                            <img src={icon}/>
                                            {url}
                                            <a onClick={() => this.edit(i)}>Edit</a>
                                            <a onClick={() => this.props.deleteIcon(i)}>Delete</a>
                                        </div>
                                        <div className="icon-settings__edit-well">
                                            <IconForm url={editIconUrl} setUrl={this.setEditIconUrl} show={editing} setImage={this.setEditImage} image={editIconImg} save={() => this.updateIcon(i)} cancel={this.cancelEdit} submitText="Update"/>
                                        </div>
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
        icons: state.icons.icons,
        sources: state.news.sources
    }
}


export default connect(mapStateToProps, actions)(SettingsModal);