import axios from "axios";
import { browserHistory } from "react-router";
import CONFIG from "../../config/global";
import { AUTH } from "./types";

const LOGIN_ROUTE = "/user/login";

/**
 * Login action, if successfull save the token into the localStorage
 * and redirect the user to the logged page, otherwise dispatch an error.
 * @param email 
 * @param password 
 */
export function logIn(email, password) {

    const payload = { email, password, agent: CONFIG.SERVER.AGENTS.WEB };
    const LOGIN_URL = `${CONFIG.SERVER.SERVER_URI}${LOGIN_ROUTE}`;
    return ( dispatch ) => {

        // dispatch a loading status
        dispatch({
            type: AUTH.LOADING,
        });

        const request = axios.post(LOGIN_URL, payload);

        return request.then(( { status, data } ) => {

            if ( status === 200 ) {
                // Save token to localStorage
                localStorage.setItem(CONFIG.APP.TOKEN.TOKEN_NAME, data.token);

                // Update the application state => authenticated: true
                dispatch({ 
                    type: AUTH.LOG_IN,
                    payload: null,
                });

                // Redirect to the logged application route
                browserHistory.push(CONFIG.APP.LOGGED_ROUTE);
            }
        })
        .catch( ( { response: { data, status } } ) => {

            if ( status === 401 ) {
                dispatch({
                    type: AUTH.UNAUTHORIZED,
                    payload: "login-register.login.unauthorized",
                });
            }
        });
    };
}