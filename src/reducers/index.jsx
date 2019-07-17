import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { localizeReducer } from "react-localize-redux";

//Reducers
import auth from "./auth.jsx";


export default (history) => combineReducers({
    localize: localizeReducer,
    router: connectRouter(history),
    auth,
});