import { AUTH } from "../actions/types";

export default ( state={}, action ) => {

    switch ( action.type ) {
        case AUTH.LOG_IN:
            return { ...state, token: action.payload };    
        default:
            return state;
    }
}