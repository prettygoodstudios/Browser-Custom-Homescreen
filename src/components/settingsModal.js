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
    const {sources, selectedSources, save, cancel, submitText, query, country, sortBy, date, feedName, updateField, toggleFeed, show, feedSearch, topHeadlines} = props;

    if(!show){
        return <div></div>;
    }

    const formSources = {};

    sources.forEach(source => {
        formSources[source.id] = source;
        formSources[source.id].selected = false;
    });

    selectedSources.forEach(source => {
        formSources[source.id].selected = true;
    });

    const filteredFormSources = Object.values(formSources).filter((source) => {
        if(feedSearch === ""){
            return true;
        }
        const {description, id, name} = source;
        return description.indexOf(feedSearch) != -1 || id.indexOf(feedSearch) != -1 || name.indexOf(feedSearch) != -1;
    });

    return(
        <div className="feed-form">
            <input placeholder="Name" className="feed-form__input" value={feedName} onChange={e => updateField("feedName", e)}></input>
            <input type="checkbox" className="feed-form__checkbox" value={topHeadlines} onChange={e => updateField("topHeadlines", true, e, true)} checked={topHeadlines}/>
            <label>Curate feed by selecting sources</label>
            {!topHeadlines ?
                <div>
                    <input type="checkbox" className="feed-form__checkbox" id="feedFormQueryCheckbox" onChange={e => updateField("query", true, e)} checked={query !== false}/>
                    <label htmlFor="feedFormQueryCheckbox">Filter articles by query string</label>
                    <input placeholder="Query" className="feed-form__input" value={query} onChange={e => updateField("query", e)} style={{display: query !== false ? "block" : "none"}}></input>
                </div>
                :
                <div>
                    <h3>Sources</h3>
                    <input placeholder="Search for Source" className="feed-form__input" value={feedSearch} onChange={e => updateField("feedSearch", e)}/>
                    <div className="feed-form__source-checkboxes">      
                        {   filteredFormSources.map((source, i) => {
                                const {name, id, description, country, category, selected} = source;
                                return (
                                    <div key={i} className="feed-form__source-checkboxes__group">
                                        <input type="checkbox" value={id} onChange={(e) => toggleFeed(e, source)} checked={selected}></input>
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
                </div>
            }
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
                selectedSources: [],
                show: false,
                feedSearch: "",
                topHeadlines: false
            },
            editFeedForm: {
                feedName: "",
                country: false,
                query: false,
                selectedSources: [],
                feedSearch: "",
                index: -1,
                topHeadlines: false
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

    updateNewFeedForm = (field, event, toggle = false, set = false) => {
        if(!toggle){
            const {value} = event.target;
            this.state.newFeedForm[field] = value;
        }else if(!set){
            this.state.newFeedForm[field] = toggle.target.checked ? "" : false;
        }else{
            this.state.newFeedForm[field] = toggle.target.checked;
        }
        this.setState({
            newFeedForm: this.state.newFeedForm
        });
    }

    newFeedFormToggleFeed = (e, feed) => {
        const {selectedSources} = this.state.newFeedForm;
        const feedIndex = selectedSources.map(f => f.id).indexOf(feed.id);
        if(feedIndex === -1){
            selectedSources.push(feed);
        }else{
            selectedSources.splice(feedIndex, 1);
        }
        this.setState({
            newFeedForm: {
                ...this.state.newFeedForm,
                selectedSources: selectedSources
            }
        });
    }

    toggleNewFeed = () => {
        this.setState({
            newFeedForm: {
                ...this.state.newFeedForm,
                show: !this.state.newFeedForm.show
            }
        })
    }

    saveNewFeed = () => {
        const {newFeedForm} = this.state;
        const {feedName, selectedSources, country, query, topHeadlines} = newFeedForm;
        const feed  = {
            name: feedName,
            sources: topHeadlines ? selectedSources : [],
            country,
            query,
            topHeadlines
        }
        this.props.addFeed(feed);
        this.toggleNewFeed();
    }

    toggleEditFeed = (id = -1) => {
        const feedObject = {};
        const editFeed = this.props.feeds[id];
        if(editFeed){
            feedObject['country'] = editFeed.country;
            feedObject['query'] = editFeed.query;
            feedObject['feedName'] = editFeed.name;
            feedObject['selectedSources'] = editFeed.sources;
            feedObject['topHeadlines'] = editFeed.topHeadlines;
        }

        this.setState({
            editFeedForm: {
                ...this.state.editFeedForm,
                ...feedObject,
                index: id
            }
        });
    }

    updateEditFeedForm = (field, event, toggle = false, set = false) => {
        if(!toggle){
            const {value} = event.target;
            this.state.editFeedForm[field] = value;
        }else if(!set){
            this.state.editFeedForm[field] = toggle.target.checked ? "" : false;
        }else{
            this.state.editFeedForm[field] = toggle.target.checked;
        }
        this.setState({
            editFeedForm: this.state.editFeedForm
        });
    }

    editFeedFormToggleFeed = (e, feed) => {
        const {selectedSources} = this.state.editFeedForm;
        const feedIndex = selectedSources.map(f => f.id).indexOf(feed.id);
        if(feedIndex === -1){
            selectedSources.push(feed);
        }else{
            selectedSources.splice(feedIndex, 1);
        }
        this.setState({
            editFeedForm: {
                ...this.state.editFeedForm,
                selectedSources: selectedSources
            }
        });
    }

    saveEditFeed = () => {
        const {editFeedForm} = this.state;
        const {feedName, selectedSources, country, query, index, topHeadlines} = editFeedForm;
        const feed  = {
            name: feedName,
            sources: topHeadlines ? selectedSources : [],
            country,
            query,
            topHeadlines
        }
        this.props.editFeed(index, feed);
        this.toggleEditFeed();
    }

    render(){
        const {icons, sources, feeds} = this.props;
        const {addIcon, addIconUrl, addIconImg, editIconUrl, editIconImg, newFeedForm, editFeedForm} = this.state;
        return(
            <div>
                <Modal title={"Settings"} close={this.props.toggleSettingsModal} show={this.props.show}>
                    <h3>Icons</h3>
                    {!addIcon && <a onClick={this.toggleAddIcon}>Add a icon</a>}
                    <IconForm url={addIconUrl} setUrl={this.setAddIconUrl} show={addIcon} setImage={this.setImage} image={addIconImg} save={this.addIcon} cancel={this.toggleAddIcon} submitText="Add"/>
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
                    <h3>Feeds</h3>
                    { !newFeedForm.show && <a onClick={this.toggleNewFeed}>Add a Feed</a>}
                    <FeedForm show={newFeedForm.show} save={this.saveNewFeed} sources={sources} topHeadlines={newFeedForm.topHeadlines} feedSearch={newFeedForm.feedSearch} cancel={this.toggleNewFeed} selectedSources={newFeedForm.selectedSources} submitText="Add" feedName={newFeedForm.feedName} country={newFeedForm.country} query={newFeedForm.query} updateField={this.updateNewFeedForm} toggleFeed={this.newFeedFormToggleFeed}/>
                    <div className="feed-settings">
                        {   feeds.map((feed, i) => {
                                const {name} = feed;
                                return(
                                    <div className="feed-settings__item" key={i}>
                                        <div className="feed-settings__item__view">
                                            <div className="feed-settings__item__view__title">
                                                {name}
                                            </div>
                                            <a onClick={() => this.toggleEditFeed(i)}>Edit</a>
                                            <a onClick={() => this.props.deleteFeed(i)}>Delete</a>
                                        </div>
                                        <div className="feed-settings__item__edit">
                                            <FeedForm show={editFeedForm.index === i} topHeadlines={editFeedForm.topHeadlines} save={this.saveEditFeed} sources={sources} feedSearch={editFeedForm.feedSearch} cancel={this.toggleEditFeed} selectedSources={editFeedForm.selectedSources} submitText="Update" feedName={editFeedForm.feedName} country={editFeedForm.country} query={editFeedForm.query} updateField={this.updateEditFeedForm} toggleFeed={this.editFeedFormToggleFeed}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        show: state.settings.settingsModal,
        icons: state.icons.icons,
        sources: state.news.sources,
        feeds: state.news.feeds
    }
}


export default connect(mapStateToProps, actions)(SettingsModal);