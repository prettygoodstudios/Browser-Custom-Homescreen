import { GET_STREAMS } from "../actions/types";

const INIT_STATE = {
    streams: []
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_STREAMS:
            return{
                ...state,
                streams: action.payload
            }
        default:
            return{
                ...state
            }
    }
}