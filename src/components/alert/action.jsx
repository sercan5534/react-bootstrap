import SI from "./enum.jsx";

export function showAlert(alert) {
    return dispatch => {
        dispatch({type: SI.ALERT_IN,payload:alert});
    }
}

export function hideAlert(index) {
    return dispatch => {
        dispatch({type: SI.ALERT_OUT,payload:index});
    }
}