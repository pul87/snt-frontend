import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as moxios from "moxios";

import * as actions from "../../src/actions/";
import * as types from "../../src/actions/types";
import CONFIG from "../../config/global";

/*
    browserHistory must be overwritten otherwise the test will fail.
 */
import * as router from "react-router";
router.browserHistory.push = () => {};

const LOGIN_URL = `${CONFIG.SERVER.SERVER_URI}/user/login`;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

/**
 * It is not possible to test the local storage because it's provided by the browser
 * to mock it I used a mock function as a setup for jest, look at the jest config 
 * in the package.json
 */
describe('Actions', () => {

    describe('Authentication', () => {

        describe('logIn', () => {
            
            beforeEach(function () {
                moxios.install();
            });

            afterEach(function () {
                moxios.uninstall();
            });

            it('Check the login Successfull', () => {

                const store = mockStore({});            

                moxios.stubRequest(LOGIN_URL, {
                    status: 200,
                    response: { token: "ssa8d7y8hb2uk3oyu14bhj4d" }
                });
                
                return store.dispatch(actions.logIn("test@test.it", "test"))
                .then(() => {
                    const dispatchedActions = store.getActions();
                    expect(dispatchedActions[0].type).toEqual(types.AUTH.LOADING);
                    expect(dispatchedActions[1].type).toEqual(types.AUTH.LOG_IN);
                    expect(dispatchedActions[1].payload).toBeNull();
                    expect(window.localStorage.getItem(CONFIG.APP.TOKEN.TOKEN_NAME)).toEqual("ssa8d7y8hb2uk3oyu14bhj4d");
                });
            });

            it('Check the Unauthorized login', () => {
                
                const store = mockStore({});

                moxios.stubRequest(LOGIN_URL, {
                    status: 401,
                    response: "Unauthorized"
                });

                return store.dispatch(actions.logIn("test@test.it", "test"))
                .then(() => {
                    const dispatchedActions = store.getActions();
                    expect(dispatchedActions[0].type).toEqual(types.AUTH.LOADING);
                    expect(dispatchedActions[1].type).toEqual(types.AUTH.UNAUTHORIZED);
                });
            });
        });
    });
});
