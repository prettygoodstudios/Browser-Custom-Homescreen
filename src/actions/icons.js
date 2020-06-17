import { GET_ICONS, ADD_ICONS } from "./types";

export function getIcons(){
    return{
        type: GET_ICONS,
        payload: {}
    }
}

export function addIcon(url, image){
    return{
        type: ADD_ICONS,
        payload: 
            [
                {
                    url,
                    icon: image
                }
            ]
        }
}