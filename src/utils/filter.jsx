import axios from 'axios';
import { push } from "connected-react-router";

/**
 * Sets auth token to axios header as a Auhorization param
 * @param {String} token Authorization token
 */
export default function setAuthToken(token) {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer=${token}`;
    }
}


export function startTokenInterceptor(store) {
    axios.interceptors.response.use(undefined, function (err) {
        if (err.response.status === 401) {
            store.dispatch(push("/"));
        }
        throw err;
    })
}