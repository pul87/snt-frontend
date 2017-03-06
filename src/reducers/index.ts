import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";
import authenticationReducer from "./authentication_reducer";

const rootReducer = combineReducers({
    intl: intlReducer,
    auth: authenticationReducer,
});

export default rootReducer;