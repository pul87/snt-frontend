import { AUTH } from "./types";

export function logIn(email, password) {
    console.log("Azione di login", email, password);
    const data = { token: "shjbc87asghcuh2byu2bc78he8uhx9ubewhjc2u83h92iuxjkw" };
    return { type: AUTH.LOG_IN, payload: data }
}