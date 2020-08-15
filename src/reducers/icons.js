import { GET_ICONS, SET_ICONS, ADD_ICONS, UPDATE_ICON, EDIT_ICON, CANCEL_EDIT_ICON } from "../actions/types";

//Images temporary for now
import githubIcon from "../images/github.png";
import playIcon from "../images/music.png";
import youtubeIcon from "../images/youtube.png";
import driveIcon from "../images/drive.png";

const INIT_STATE = {
    icons: [
        {
            url: "https://github.com/prettygoodstudios",
            icon: githubIcon,
            editing: false,
            id: 0
        },
        {
            url: "https://music.google.com",
            icon: playIcon,
            editing: false,
            id: 1
        },
        {
            url: "https://youtube.com",
            icon: youtubeIcon,
            editing: false,
            id: 2
        },
        {
            url: "https://drive.google.com",
            icon: driveIcon,
            editing: false,
            id: 3
        }
    ]
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_ICONS:
            return {
                ...state,

            }
        case SET_ICONS:
            return {
                ...state,
                icons: [action.payload]
            }
        case ADD_ICONS:
            action.payload.map((icon, i) => {
                console.log(icon)
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
            const {url, icon} = action.payload;
            tmpIcons[action.payload.id] = {
                editing: false,
                url, 
                icon
            }
            return {
                ...state,
                icons: tmpIcons
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