import './App.css';
import Search from "../Components/Search";
import WeatherDisplay from "../Components/WeatherDisplay/WeatherDisplay";
import {useEffect, useState} from "react";
import axios from "axios";
import {CURRENT_WEATHER_API_URL, WEATHER_FORECAST_API_URL, weatherApiOptions} from "../Api";

function App() {
    //Contains current weather data from OpenWeatherMap api
    const [currentWeatherData, setCurrentWeatherData] = useState('');

    //Contains forecast weather data from OpenWeatherMap api
    const [forecastWeatherData, setForecastWeatherData] = useState('');

    const [cityName, setCityName] = useState('');

    //Background image file paths
    const backgroundImages = new Map([
        ['Atmosphere', `url(${process.env.PUBLIC_URL}/Weather-state-images/atmosphere.jpg)`],
        ['Clear', `url(${process.env.PUBLIC_URL}/Weather-state-images/clear.jpg)`],
        ['Clouds', `url(${process.env.PUBLIC_URL}/Weather-state-images/clouds.jpg)`],
        ['Drizzle', `url(${process.env.PUBLIC_URL}/Weather-state-images/drizzle.jpg)`],
        ['Rain', `url(${process.env.PUBLIC_URL}/Weather-state-images/rain.jpg)`],
        ['Snow', `url(${process.env.PUBLIC_URL}/Weather-state-images/snow.jpg)`],
        ['Thunderstorm', `url(${process.env.PUBLIC_URL}/Weather-state-images/thunder.jpg)`]
    ]);

    //A function for handling search from Search.js
    const handleOnSearchChange = (locationInfo) => {
        searchCurrentWeather(locationInfo);
        searchForecast(locationInfo);
    }

    useEffect(() => {
        document.body.style.backgroundImage = backgroundImages.get('Atmosphere');
        console.log('called')
    },[])
    //Sets the background image depending on the weather type that is passed as a parameter
    const setBackgroundImage = (weather, id) => {
        document.body.style.backgroundImage = backgroundImages.get('Clouds');
        if (id > 700 || id < 782) {
            document.body.style.backgroundImage = backgroundImages.get('Atmosphere');
        }
        document.body.style.backgroundImage = backgroundImages.get(weather);
    }

    //Requests current weather data from OpenWeatherMap api and sets background image
    const searchCurrentWeather = (locationInfo) => {
        try {
            setCityName(locationInfo.name);
            axios(`${CURRENT_WEATHER_API_URL}?lat=${locationInfo.latitude}&lon=${locationInfo.longitude}`, weatherApiOptions)
                .then((response) => {
                    setCurrentWeatherData(response.data);
                    setBackgroundImage(response.data.weather[0].main, response.data.weather[0].id);
                    console.log(response.data);
                })
        } catch (e) {
            console.error('Weather data not found. Full error message: ' + e.message);
        }
    }

    //Requests weather forecast data from OpenWeatherMap api
    const searchForecast = (locationInfo) => {
        try {
            setCityName(locationInfo.name);
            axios(`${WEATHER_FORECAST_API_URL}?lat=${locationInfo.latitude}&lon=${locationInfo.longitude}`, weatherApiOptions)
                .then((response) => {
                    setForecastWeatherData(response.data.list);
                    console.log(response.data.list);
                })
        } catch (e) {
            console.error('Weather data not found. Full error message: ' + e.message);
        }
    }

    return (

            <div className='App'>
                <div className='Search'>
                    <Search onSearchChange={handleOnSearchChange}/>
                </div>
                {currentWeatherData !== '' && <div id='WeatherDisplay'>
                    {
                        <WeatherDisplay currentWeatherInfo={currentWeatherData} cityName={cityName}
                                        forecast={forecastWeatherData}/>}
                </div>}
            </div>

    );
}

export default App;
