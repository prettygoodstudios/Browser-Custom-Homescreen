import { GET_WEATHER } from "../actions/types";

const INIT_STATE = {
    temperature: 0,
    weatherDescription: "",
    weatherIcon: ""
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_WEATHER:
            return{
                ...state,
                ...action.payload
            }
        default:
            return{
                ...state
            }
    }
}