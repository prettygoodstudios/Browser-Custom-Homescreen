import { GET_STREAMS, GET_SOURCES } from "../actions/types";

const INIT_STATE = {
    streams: [],
    sources: []
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
        default:
            return{
                ...state
            }
    }
}