
import { createStore, applyMiddleware,compose } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import reducers from "./reducers/index.jsx";
import { routerMiddleware } from "connected-react-router";

//History
export const history = createBrowserHistory();

//Middlewares
const middlewares = [ thunk, routerMiddleware(history)];

//Redux Logging
if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

//chrome ext
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Creates redux store
 * @param {Object} preloadedState 
 */
export default function configureStore(preloadedState) {
    const store = createStore(
        reducers(history),
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                ...middlewares
            )
        )
    );
    return store
}