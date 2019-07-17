import SI from "./../enums/auth.jsx";
import setAuthToken from "./../utils/filter.jsx";
import { getTranslate } from "react-localize-redux";

//access_token & user info
let user_data = sessionStorage.getItem("user_data");
if(user_data){
    user_data = JSON.parse(user_data);
}

/**
 * Authentication state object
 * @param {Object} state Store item's state
 * @param {Object} action 
 */
const auth = (state={
    user: {}
},action) =>{
    switch(action.type){
        
        default:
            return {...state}
    }
};

export default auth;