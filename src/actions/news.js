import {GET_STREAMS, GET_SOURCES, GET_FEEDS, ADD_FEED, DELETE_FEED, EDIT_FEED, SHOW_MORE} from "./types";

import NewsApiProvider from "../news/NewsApiProvider";
import { getFeedsFromDB } from "../helpers/db";

//A NewsProvider Object
const newsProvider = new NewsApiProvider();

async function getFeed(feed){
    const {sources, query, country, topHeadlines} = feed;
    const headlines = await newsProvider.getFeed(topHeadlines ? "top-headlines" : "everything", {country, query, sources: sources.map(s => s.id)}).then((feed) => {
        return feed;
    }).catch(error => {
        console.log(error);
    });
    return headlines;
}


export const getStreams = (feeds) => {
    return async function(dispatch){
        const payload = [];
        for(let i = 0; i < feeds.length; i++){
            const data = await getFeed(feeds[i]);
            payload.push({
                title: feeds[i].name,
                data,
                showMore: false
            });
        }
        console.log(payload);
        dispatch({
            type: GET_STREAMS,
            payload
        });
    }
}

export const showMore = (id) => {
    return {
        type: SHOW_MORE,
        payload: id
    }
}

export const getSources = () => {
    return async function(dispatch){
        newsProvider.getSources().then(sources => {
            dispatch({
                type: GET_SOURCES,
                payload: sources
            });
        }).catch(error => {
            console.log(error);
        });
    }
}

export const getFeeds = () => {
    return async function(dispatch){
        const feeds = getFeedsFromDB();
        dispatch({
            type: GET_FEEDS,
            payload: feeds
        });
        await dispatch(getStreams(feeds));
    }
}

export const addFeed = (feed) => {
    return async function(dispatch){
        dispatch({
            type: ADD_FEED,
            payload: feed
        });
        dispatch(getFeeds());
    }
}

export const deleteFeed = (id) => {
    return async function(dispatch){
        dispatch({
            type: DELETE_FEED,
            payload: id
        });
        dispatch(getFeeds());
    }
}

export const editFeed = (id, feed) => {
    return async function(dispatch){
        dispatch({
            type: EDIT_FEED,
            payload: {
                id,
                feed
            }
        });
        dispatch(getFeeds());
    }
}