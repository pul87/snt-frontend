import { PROFILE } from "../actions/types";
import * as APP_STATE from "../state";

export default ( state=APP_STATE.INITIAL_STATE.profile, action ) => {
    
    switch ( action.type ) {
        case PROFILE.LOADED: {
            return { ...action.payload, loaded: true }; 
        }
        default:
            return state;
    }
}