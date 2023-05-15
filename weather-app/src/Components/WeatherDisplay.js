const WeatherDisplay = ({currentWeatherInfo}) => {
    //Finds the correct weather icon using data given by App.js as a prop.
    const findWeatherIcon = () => {
        try {
            return require(`../Weather-icons/${currentWeatherInfo.icon}.svg`)
        } catch (e) {
            console.error('Weather icon not found. Full error message: ' + e.message)
        }
        return null;
    }
    return (
        <>
            {findWeatherIcon() ? (<img src={findWeatherIcon()} alt='Weather icon'/>) : null}
        </>
    );
}

export default WeatherDisplay;