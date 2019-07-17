import React,{Component} from "react";
import { connect } from "react-redux";
import { history } from "./../stores/index.jsx";
import axios from "axios";
import type from "prop-types";

/**
 * Check component is required authentication or not
 * @param {Component} ComposedComponent 
 */
export function requiredAuth(ComposedComponent) {
    class Authenticate extends Component{
        UNSAFE_componentWillMount(){
            if(!this.props.isAuthenticated){
                history.push("/");
            }
        }
        

        UNSAFE_componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
                history.push("/");
            }
        }

        render(){
            return (<ComposedComponent {...this.props}/>)
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: type.bool
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.user && state.auth.user.token && state.auth.user.token != "" ? true: false
        };
    }

    return connect(mapStateToProps)(Authenticate);
}

/**
 * Refresh auth token
 * TODO
 */
export function refreshToken() {
    
}

/**
 * Log Type enums
 */
export const LOG_TYPE = {
    "ERROR":"Error",
    "WARNING":"Warning",
    "INFO": "Info"
}

/**
 * Save logs message into the localstorage
 * All logs send to api periodically
 * @param {String} type Log type
 * @param {LOG_TYPE} msg Message
 */
export function log(type,msg){
    let messages = localStorage.getItem("logs");
    if(!messages){
        messages = [];
    }
    else{
        messages = JSON.parse(messages);
    }
    messages.push({type,msg});
    localStorage.setItem("logs",JSON.stringify(messages));
}

/**
 * Starts an interval for send the logs to the API
 */
export function logTimer() {
    setInterval(() => {
        let messages = localStorage.getItem("logs");
        if(messages){
            messages = JSON.parse(messages);
            axios.post("/api/log",messages);
            localStorage.removeItem("logs");
        }
    }, 1000);
}

