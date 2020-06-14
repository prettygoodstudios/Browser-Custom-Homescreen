import { GET_ICONS, SET_ICONS, ADD_ICONS } from "../actions/types";

//Images temporary for now
import githubIcon from "../images/github.png";
import playIcon from "../images/music.png";
import youtubeIcon from "../images/youtube.png";
import driveIcon from "../images/drive.png";

const INIT_STATE = {
    icons: [
        {
            url: "https://github.com/prettygoodstudios",
            icon: githubIcon
        },
        {
            url: "https://music.google.com",
            icon: playIcon
        },
        {
            url: "https://youtube.com",
            icon: youtubeIcon
        },
        {
            url: "https://drive.google.com",
            icon: driveIcon
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
            return{
                ...state,
                icons: [...state.icons, action.payload]
            }
        default:
            return state;
    }
}