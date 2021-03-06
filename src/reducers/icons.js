import { GET_ICONS, SET_ICONS, ADD_ICONS, UPDATE_ICON, EDIT_ICON, CANCEL_EDIT_ICON, DELETE_ICON } from "../actions/types";
import {updateIconDB, getIconsFromDB} from "../helpers/db";

const INIT_STATE = {
    icons: getIconsFromDB()
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_ICONS:
            return {
                ...state
            }
        case SET_ICONS:
            return {
                ...state,
                icons: [...action.payload]
            }
        case ADD_ICONS:
            action.payload.map((icon, i) => {
                return {
                    ...icon,
                    id: state.icons.length+i
                }
            })
            return{
                ...state,
                icons: [...state.icons, ...action.payload]
            }
        case UPDATE_ICON:
            const tmpIcons = Array.from(state.icons);
            const {url, icon, id} = action.payload;
            tmpIcons[id] = {
                editing: false,
                url, 
                icon
            }
            return {
                ...state,
                icons: tmpIcons
            }
        case DELETE_ICON:
            const deleteIcons = state.icons.filter((v, i) => i != action.payload)
            return {
                ...state,
                icons: deleteIcons
            }
        case EDIT_ICON:
            const iconsRef = Array.from(state.icons);
            iconsRef[action.payload].editing = true;
            for(let i = 0; i < iconsRef.length; i++){
                if(i != action.payload){
                    iconsRef[i].editing = false;
                }
            }
            return  {
                ...state,
                icons: iconsRef
            }
        case CANCEL_EDIT_ICON:
            const myIcons = Array.from(state.icons);
            for(let i = 0; i < myIcons.length; i++){
                myIcons[i].editing = false;
            }
            return {
                ...state,
                icons: myIcons
            }
        default:
            return state;
    }
}