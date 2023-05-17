import './App.css';
import Search from "./Components/Search";
import WeatherDisplay from "./Components/WeatherDisplay/WeatherDisplay";
import {useState} from "react";
import axios from "axios";
import {WEATHER_API_URL, weatherApiOptions} from "./Api";

function App() {
    //Contains current weather data from OpenWeatherMap api
    const [currentWeatherData, setCurrentWeatherData] = useState('');
    const [cityName, setCityName] = useState('');

    //Requests weather data from OpenWeatherMap api
    const handleOnSearchChange = (locationInfo) => {
        try {
            setCityName(locationInfo.name);
            axios(`${WEATHER_API_URL}?lat=${locationInfo.latitude}&lon=${locationInfo.longitude}`, weatherApiOptions)
                .then((response) => {
                    setCurrentWeatherData(response.data);
                    console.log(response.data);
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
            <div className='WeatherDisplay'>
                {currentWeatherData !== '' && <WeatherDisplay currentWeatherInfo={currentWeatherData} cityName={cityName}/>}
            </div>
        </div>
    );
}

export default App;
