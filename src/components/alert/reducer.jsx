import SI from "./enum.jsx";

const alert = (state={
    alerts : []
},action) => {
    switch(action.type){
        case SI.ALERT_IN:
            state.alerts.push(action.payload);
            return {...state}
        case SI.ALERT_OUT:
            state.alerts.splice(action.payload,1);
            return {...state};
        default:
            return {...state}
    }
}

export default alert;