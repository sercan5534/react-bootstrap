
import React from "react";
import {  Router, Route,Switch } from "react-router-dom";
import {render} from "react-dom";
import { LocalizeProvider } from "react-localize-redux";


//Polyfill
import "core-js/es6/map";
import "core-js/es6/set";
import "core-js/es6/promise";
import "core-js/fn/object/assign";

//i18n
import { addTranslationForLanguage, initialize  } from "react-localize-redux";
import en from "./i18n/en.json";
import tr from "./i18n/tr.json";

//Layout
import AppLayout from "./layouts/appLayout/index.jsx";

//Pages
import Dashboard from "./pages/index.jsx";

//Store - redux
import { Provider } from "react-redux";
import configureStore,{history} from "./stores/index.jsx";
import { ConnectedRouter } from "connected-react-router";

//Util
import {requiredAuth,log,LOG_TYPE,logTimer} from "./utils/index.jsx";
import setAuthToken,{startTokenInterceptor} from "./utils/filter.jsx";

//Generic Alert poppup
import Alert from "./components/alert/index.jsx";

//Layout changer
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Alert>
            <Layout>
                <Component {...props} />
            </Layout>
        </Alert>
    )} />
  ),
  store = configureStore();

//i18n
const languages = [
    { name: "English", code: "en" },
    { name: "Türkçe", code: "tr" }
];
store.dispatch(initialize({languages, options:{ defaultLanguage: localStorage.getItem("lang") || "en", renderToStaticMarkup:false}}));
store.dispatch(addTranslationForLanguage(en, "en"));
store.dispatch(addTranslationForLanguage(de, "tr"));

//Set Existing Token
let userData = sessionStorage.getItem("user_data");
if (userData) {
    userData = JSON.parse(userData);
    setAuthToken(userData.token);
}
startTokenInterceptor(store);

//Render method
render(
    <Provider store={store}>
        <LocalizeProvider store={store}>
            <ConnectedRouter history={history}>
                <Router history={history}>
                    <Switch>
                        <AppRoute exact path="/" layout={LoginLayout} component={Login} />
                        <AppRoute exact path="/app" layout={AppLayout} component={requiredAuth(Dashboard)} />
                        <AppRoute layout={AppLayout} component={NotFound} />
                    </Switch>
                </Router>
            </ConnectedRouter>
        </LocalizeProvider>
    </Provider>,
    document.getElementById("app-route")
);

