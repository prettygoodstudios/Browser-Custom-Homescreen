import {GET_WEATHER} from "./types";

export const getWeather = () => {
    return function(dispatch){
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=Orem&APPID=1b0a1b376d9524f602ad2f53b55c763c').then((request) => {
            return request.json();
        }).then((data) => {
            console.log(data);
            const {main, weather} = data.list[0];
            const temperature = Math.floor((main.temp - 273.15)*(9/5)+32);
            const weatherDescription = weather[0].description;
            const weatherIcon = "http://openweathermap.org/img/w/"+weather[0].icon+".png";
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