import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";
import authenticationReducer from "./authentication_reducer";
import profileReducer from "./profile_reducer";

const rootReducer = combineReducers({
    intl: intlReducer,
    auth: authenticationReducer,
    profile: profileReducer,
});

export default rootReducer;