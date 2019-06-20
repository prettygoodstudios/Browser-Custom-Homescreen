const INIT_STATE = {
    streams: []
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        default:
            return{
                ...state
            }
    }
}