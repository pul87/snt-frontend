import { AUTH } from "../../src/actions/types";
import authenticationReducer from "../../src/reducers/authentication_reducer";
import { INITIAL_STATE } from "../../src/state";

describe("Authentication reducer", () => {

    it('Checks the LOADING action', () => {

        const action = {
            type: AUTH.LOADING,
        };

        const state = authenticationReducer( INITIAL_STATE.auth , action);

        expect(state.authenticated).toBeFalsy();
        expect(state.messageId).toBeNull();
        expect(state.loading).toBeTruthy(); 
    });

    it('Checks the LOG_IN action', () => {

        const action = {
            type: AUTH.LOG_IN,
        };

        const state = authenticationReducer( INITIAL_STATE.auth , action);

        expect(state.authenticated).toBeTruthy();
        expect(state.loading).toBeFalsy();
        expect(state.messageId).toBeNull();
    });

    it('Checks the UNAUTHORIZED action', () => {

        const action = {
            type: AUTH.UNAUTHORIZED,
            payload: "message-id",
        };

        const state = authenticationReducer( INITIAL_STATE.auth, action);

        expect(state.authenticated).toBeFalsy();
        expect(state.loading).toBeFalsy();
        expect(state.messageId).toEqual("message-id");
    });
});