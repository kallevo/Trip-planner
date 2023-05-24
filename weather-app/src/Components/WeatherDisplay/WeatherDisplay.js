import './WeatherDisplay.css'

const WeatherDisplay = ({currentWeatherInfo, cityName}) => {
    //Finds the correct weather icon using data given by App.js as a prop.
    const findWeatherIcon = () => {
        try {
            return require(`../../Weather-icons/${currentWeatherInfo.weather[0].icon}.svg`);
        } catch (e) {
            console.error('Weather icon not found. Full error message: ' + e.message);
        }
        return null;
    }


    return (
        <>
            <h1 className={'city-name'}>{cityName}</h1>
            <div className={'weather-icon-and-current-temp'}>
                {findWeatherIcon() ? (
                    <img className={'weather-icon'} src={findWeatherIcon()} alt='Weather icon'/>) : null}
                <p className={'current-temp'}>{Math.round(currentWeatherInfo.main.temp)}°C</p>
            </div>
            <div className={'current-weather'}>
                <h3 className={'weather-stats'}>Feels like</h3>
                <h3 className={'weather-stats'}>Wind speed</h3>
                <h3 className={'weather-stats'}>Visibility</h3>
                <h3 className={'weather-stats'}>Humidity</h3>
                <h3 className={'weather-stats'}>Lowest temp. today</h3>
                <h3 className={'weather-stats'}>Highest temp. today</h3>

                <p className={'weather-stat-numbers'}>{Math.round(currentWeatherInfo.main.feels_like)} °C</p>
                <p className={'weather-stat-numbers'}>{currentWeatherInfo.wind.speed} m/s</p>
                <p className={'weather-stat-numbers'}>{currentWeatherInfo.visibility} m</p>
                <p className={'weather-stat-numbers'}>{currentWeatherInfo.main.humidity} %</p>
                <p className={'weather-stat-numbers'}>{Math.round(currentWeatherInfo.main.temp_min)} °C</p>
                <p className={'weather-stat-numbers'}>{Math.round(currentWeatherInfo.main.temp_max)} °C</p>
            </div>
        </>
    );
}

export default WeatherDisplay;