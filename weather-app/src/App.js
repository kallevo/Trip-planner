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
    const backgroundImages = new Map ([
        ['Atmosphere',`url(${process.env.PUBLIC_URL}/Weather-state-images/atmosphere.jpg)`],
        ['Clear', `url(${process.env.PUBLIC_URL}/Weather-state-images/clear.jpg)`],
        ['Clouds', `url(${process.env.PUBLIC_URL}/Weather-state-images/clouds.jpg)`],
        ['Drizzle', `url(${process.env.PUBLIC_URL}/Weather-state-images/drizzle.jpg)`],
        ['Rain', `url(${process.env.PUBLIC_URL}/Weather-state-images/rain.jpg)`],
        ['Snow', `url(${process.env.PUBLIC_URL}/Weather-state-images/snow.jpg)`],
        ['Thunder', `url(${process.env.PUBLIC_URL}/Weather-state-images/thunder.jpg)`]
    ]);

    //Requests weather data from OpenWeatherMap api
    const handleOnSearchChange = (locationInfo) => {
        try {
            setCityName(locationInfo.name);
            axios(`${WEATHER_API_URL}?lat=${locationInfo.latitude}&lon=${locationInfo.longitude}`, weatherApiOptions)
                .then((response) => {
                    setCurrentWeatherData(response.data);
                    setBackgroundImage(response.data.weather[0].main, response.data.weather[0].id);
                    console.log(response.data);
                })
        } catch (e) {
            console.error('Weather data not found. Full error message: ' + e.message);
        }
    }

    //Sets the background image depending on the weather type that is passed as a parameter
    const setBackgroundImage = (weather, id) => {
        document.body.style.backgroundImage = backgroundImages.get('Clouds');
        if (id > 700 || id < 782) {
            document.body.style.backgroundImage = backgroundImages.get('Atmosphere');
        }
        console.log(weather)
        console.log(backgroundImages.get(weather))
        document.body.style.backgroundImage = backgroundImages.get(weather);
        console.log(document.body.style.backgroundImage);
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
