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
            <div className='weather-icon-and-current-temp'>
                {findWeatherIcon() ? (<img className={'weather-icon'} src={findWeatherIcon()} alt='Weather icon'/>) : null}
                <p className={'current-temp'}>{Math.round(currentWeatherInfo.main.temp)}°C</p>
            </div>
        </>
    );
}

export default WeatherDisplay;