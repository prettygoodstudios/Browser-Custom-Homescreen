import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";

class Weather extends Component {

    componentDidMount(){
        this.props.getWeather();
    }

    render(){
        const {temperature, weatherIcon, weatherDescription} = this.props;
        return(
            <div className="weather-wrapper">
                <h1 className="weather-wrapper__temperature">{temperature}</h1>
                <p className="weather-wrapper__description">{weatherDescription}</p>
                <div className="weather-wrapper__icon">
                    <img src={weatherIcon} />
                </div>
                <h1 className="weather-wrapper__city">Orem, UT</h1>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        ...state.weather
    }
}

export default connect(mapStateToProps, actions)(Weather);