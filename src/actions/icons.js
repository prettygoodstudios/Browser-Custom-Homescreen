import { GET_ICONS, ADD_ICONS, EDIT_ICON, UPDATE_ICON } from "./types";

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
                    icon: image,
                    editing: false
                }
            ]
        }
}

export function editIcon(id){
    return{
        type: EDIT_ICON,
        payload: id
    }
}

export function updateIcon(id, url, image){
    return {
        type: UPDATE_ICON,
        payload: {
            id,
            url,
            icon: image
        }
    }
}