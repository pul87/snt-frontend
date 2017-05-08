import { AUTH } from "../actions/types";
import * as APP_STATE from "../state";

import { IProfile } from "../components/Profile";

export default ( state=APP_STATE.INITIAL_STATE.auth, action ) => {

    switch ( action.type ) {
        case AUTH.LOG_IN:
            return { ...state, authenticated: true, messageId: null, loading: false }; 
        case AUTH.UNAUTHORIZED: {
            const messageId = action.payload;
            return { ...state, authenticated: false, messageId, loading: false };
        }
        case AUTH.LOADING: 
            return { ...state, loading: true, messageId: null };
        default:
            return state;
    }
}