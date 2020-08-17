import { GET_ICONS, ADD_ICONS, EDIT_ICON, UPDATE_ICON, CANCEL_EDIT_ICON, SET_ICONS } from "./types";

export function getIcons(){
    return{
        type: GET_ICONS,
        payload: {}
    }
}

export function setIcons(icons){
    return {
        type: SET_ICONS,
        payload: icons
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

export function cancelEditIcon(id){
    return{
        type: CANCEL_EDIT_ICON,
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