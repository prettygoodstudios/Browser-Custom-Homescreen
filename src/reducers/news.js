import { GET_STREAMS, GET_SOURCES, GET_FEEDS, ADD_FEED, DELETE_FEED, EDIT_FEED } from "../actions/types";
import { updateFeedDB } from "../helpers/db";

const INIT_STATE = {
    streams: [],
    sources: [],
    feeds: []
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_STREAMS:
            return{
                ...state,
                streams: action.payload
            }
        case GET_SOURCES:
            return{
                ...state,
                sources: action.payload.sources
            }
        case GET_FEEDS:
            updateFeedDB(action.payload);
            return {
                ...state,
                feeds: action.payload
            }
        case ADD_FEED:
            const newFeeds = [...state.feeds, action.payload];
            updateFeedDB(newFeeds);
            return {
                ...state,
                feeds: newFeeds
            }
        case DELETE_FEED:
            const feedCopy = Array.from(state.feeds);
            feedCopy.splice(action.payload, 1);
            updateFeedDB(feedCopy);
            return {
                ...state,
                feeds: feedCopy
            }
        case EDIT_FEED:
            const feedRef = Array.from(state.feeds);
            const {id, feed} = action.payload;
            feedRef[id] = feed;
            updateFeedDB(feedRef);
            return{
                ...state,
                feeds: feedRef
            }
        default:
            return{
                ...state
            }
    }
}