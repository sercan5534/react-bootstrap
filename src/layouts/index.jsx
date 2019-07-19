import React, {Component} from "react";
import { connect } from "react-redux";


class AppLayout extends Component{
    render(){
       return (
            <div className="app-wrapper">
                {this.props.children}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps,mapDispatchToProps)(AppLayout);