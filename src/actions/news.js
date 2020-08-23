import {GET_STREAMS, GET_SOURCES, GET_FEEDS, ADD_FEED, DELETE_FEED, EDIT_FEED} from "./types";
import { API_KEY } from "../../config";

import NewsApiProvider from "../news/NewsApiProvider";
import { getFeedsFromDB } from "../helpers/db";

//A NewsProvider Object
const newsProvider = new NewsApiProvider();

async function getHeadlines(){
    const headlines = await newsProvider.getFeed("top-headlines", {country: "us"}).then((feed) => {
        return feed;
    }).catch((error) => {
        console.log(error);
    });
    return headlines;
}

async function getTechNews(){
    const headlines = await newsProvider.getFeed("top-headlines", {sortBy: "popularity", sources: "wired,ars-technica,the-verge,engadget,techcrunch"}).then((feed) => {
        return feed;
    }).catch((error) => {
        console.log(error);
    });
    return headlines;
}

async function getPolitics(){
    const date = `20${new Date().getYear() - 100}-${new Date().getMonth() + 1 > 9 ? '' : '0'}${new Date().getMonth() + 1}-${new Date().getDate() > 9 ? '' : '0'}${new Date().getDate()}`;
    const headlines = await newsProvider.getFeed("everything", {query: "utah", date}).then((feed) => {
        return feed;
    }).catch((error) => {
        console.log(error);
    });
    return headlines;
}


export const getStreams = () => {
    return async function(dispatch){
        const headlines = await getHeadlines();
        const wired = await getTechNews();
        const politics = await getPolitics();
        dispatch({
            type: GET_STREAMS,
            payload: [
                {
                    title: 'Top News Headlines',
                    data: headlines
                },{
                    title: 'Tech News',
                    data: wired
                },
                {
                    title: 'Local News',
                    data: politics
                }
            ]
        })
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
    return{
        type: GET_FEEDS,
        payload: getFeedsFromDB()
    }
}

export const addFeed = (feed) => {
    return{
        type: ADD_FEED,
        payload: feed
    }
}

export const deleteFeed = (id) => {
    return{
        type: DELETE_FEED,
        payload: id
    }
}

export const editFeed = (id, feed) => {
    return{
        type: EDIT_FEED,
        payload: {
            id,
            feed
        }
    }
}