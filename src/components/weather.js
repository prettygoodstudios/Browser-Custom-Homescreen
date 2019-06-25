import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";
import n1 from "../images/01n.svg";
import d1 from "../images/01d.svg";
import n2 from "../images/02n.svg";
import d2 from "../images/01d.svg";
import i3 from "../images/03.svg";
import i9 from "../images/09.svg";
import i10 from "../images/10.svg";
import i13 from "../images/13.svg";
import i50 from "../images/50.svg";

const icons = {
    "01d": d1,
    "01n": n1,
    "02d": d2,
    "02n": n2,
    "03d": i3,
    "03n": i3,
    "04d": i3,
    "04n": i3,
    "09d": i9,
    "09n": i9,
    "10d": i10,
    "10n": i10,
    "13d": i13,
    "13n": i13,
    "50d": i50,
    "50n": i50
}


class Weather extends Component {

    componentDidMount(){
        this.props.getLocation();
    }

    render(){
        const {temperature, weatherIcon, weatherDescription, city, state} = this.props;
        return(
            <div className="weather-wrapper">
                <h1 className="weather-wrapper__temperature">{temperature}</h1>
                <p className="weather-wrapper__description">{weatherDescription}</p>
                <div className="weather-wrapper__icon">
                    <img src={icons[weatherIcon]} />
                </div>
                <h1 className="weather-wrapper__city">{city}, {state.split("").splice(0,2).join("").toUpperCase()}</h1>
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