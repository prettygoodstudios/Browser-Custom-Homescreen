import { GET_WEATHER, SET_LOCATION } from "../actions/types";

const INIT_STATE = {
    temperature: 0,
    weatherDescription: "",
    weatherIcon: "",
    city: "Orem",
    state: "UT"
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_WEATHER:
            return{
                ...state,
                ...action.payload
            }
        case SET_LOCATION:
            const {city} = action.payload;
            return{
                ...state,
                city,
                state: action.payload.state
            }
        default:
            return{
                ...state
            }
    }
}