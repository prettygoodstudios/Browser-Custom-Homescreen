import { TOGGLE_SETTINGS_MODAL } from "../actions/types";

const INIT_STATE = {
    settingsModal: false
}


export default function(state= INIT_STATE, action){
    switch(action.type){
        case TOGGLE_SETTINGS_MODAL:
            return {
                ...state,
                settingsModal: !state.settingsModal
            }
        default:
            return state;
    }
}