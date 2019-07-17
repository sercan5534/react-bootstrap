import React, { Component }  from "react";
import { connect } from "react-redux";
import "./alert.sass";
import {hideAlert} from "./action.jsx";
import { getTranslate, getLanguages,getActiveLanguage } from "react-localize-redux";


class Alert extends Component {
    /**
    * Constructor method
    * @param {Object} props 
    */
    constructor(props){
        super(props);
        setInterval(this.updateAlerts.bind(this),1000);
        this.interval = 3000;
    }

    updateAlerts(){
        const d = new Date();
        let i = 0;
        for(let alert of this.props.alert.alerts){
            if(d - alert.expiry > this.interval){
                this.props.hideAlert(i)
            }
            i++;
        }
    }

    close(index){
        this.props.hideAlert(index);
    }

    /**
    * Render method
    * @return {html} Html structure
    */
    render(){
        return(
            <div>                
                {this.props.children}
                <div className="ins-poppup-alert-column">
                {
                    this.props.alert && this.props.alert.alerts.map((x,index)=>{
                        return(
                            <div key={index} className={x.type + " ins-poppup-alert-wrapper"}>
                                <span className="alert-icon icon-arrow-right-small"></span>
                                <span className="alert-text-wrapper">
                                    <span className="title">{this.props.translate(x.title)}</span>
                                    <span className="msg">{this.props.translate(x.msg)}</span>
                                </span>
                                <span className="alert-close" onClick={this.close.bind(this,index)}>X</span>
                            </div>
                        );
                    })
                }
                </div>                
            </div>
        );
    }
}

//Redux stuff
const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        translate: getTranslate(state.localize),
        languages: getLanguages(state.localize),
        currentLanguage: getActiveLanguage(state.localize).code
    };
};
const mapDispatchToProps = { 
    hideAlert
}

export default connect(mapStateToProps,mapDispatchToProps)(Alert);