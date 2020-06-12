import { TOGGLE_SETTINGS_MODAL } from "./types";


export function toggleSettingsModal(){
    return {
        type: TOGGLE_SETTINGS_MODAL,
        payload: {}
    }
}