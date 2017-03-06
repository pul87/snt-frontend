import { AUTH } from "./types";

export function logIn(email, password) {
    console.log("Azione di login", email, password);
    return { type: AUTH.LOG_IN, payload: "kdsjand9a8sd7as98d7a9s8d7a9jikasn" }
}