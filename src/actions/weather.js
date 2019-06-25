import {GET_WEATHER, SET_LOCATION} from "./types";


export const getLocation = () => {
    return function(dispatch){
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function(position) {
                fetch(`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=${position.coords.longitude},${position.coords.latitude}&f=json`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        const {City, Region} = data.address;
                        dispatch({
                            type: SET_LOCATION,
                            payload: {
                                city: City,
                                state: Region
                            }
                        });
                        dispatch(getWeather(City, Region));
                    });
            });
        }
    }
}
export const getWeather = (city, state) => {
    return function(dispatch){
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(city)},${encodeURI(state)}&APPID=1b0a1b376d9524f602ad2f53b55c763c`).then((request) => {
            return request.json();
        }).then((data) => {
            const {main, weather} = data.list[0];
            const temperature = Math.floor((main.temp - 273.15)*(9/5)+32);
            const weatherDescription = weather[0].description;
            const weatherIcon = weather[0].icon;
            dispatch({
                type: GET_WEATHER,
                payload: {
                    temperature,
                    weatherDescription,
                    weatherIcon
                }
            });
        }).catch((e) => {
            console.log(e);
        });

    }
}