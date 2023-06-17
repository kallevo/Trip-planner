import './WeatherDisplay.css'
import {motion} from 'framer-motion';
import {useEffect, useState} from "react";
import {Skeleton} from "@mui/material";

const WeatherDisplay = ({currentWeatherInfo, cityName, forecast}) => {
    const [loading, setLoading] = useState(true);

    //Rules for animation
    const container = {
        visible: {opacity: 1, transition: {staggerChildren: 0.2, staggerDirection: 1}},
        hidden: {opacity: 0}
    }

    //Rules for animation
    const item = {
        visible: {opacity: 1, y: 0},
        hidden: {opacity: 0, y: 20}
    }

    //Finds the correct weather icon using data given by App.js as a prop.
    const findWeatherIcon = () => {
        try {
            return `${process.env.PUBLIC_URL}/Weather-icons/${currentWeatherInfo.weather[0].icon}.svg`;
        } catch (e) {
            console.error('Weather icon not found. Full error message: ' + e.message);
        }
        return null;
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [currentWeatherInfo]);

    return (
        <>
            {currentWeatherInfo && cityName && forecast && <>
                <motion.div variants={container} initial={'hidden'} animate={'visible'}>
                    {loading ? (
                        <Skeleton variant='rectangular' width='40%' height='100%'
                                  sx={{bgcolor: 'grey.900', borderRadius: '40px', m: 'auto'}}>
                            <h1 className={'city-name'}>{cityName}</h1>
                        </Skeleton>) : (
                        <h1 className={'city-name'}>{cityName}</h1>
                    )
                    }

                    {loading ? (
                        <Skeleton variant='rectangular' width='70%'
                                  sx={{bgcolor: 'grey.900', borderRadius: '40px', m: 'auto'}}>
                            <motion.div className={'weather-icon-and-current-temp'} variants={item}>
                                {findWeatherIcon() ? (
                                    <img className={'weather-icon'} src={findWeatherIcon()}
                                         alt='Weather icon'/>) : null}
                                <p className={'current-temp'}>{Math.round(currentWeatherInfo.main.temp)}°C</p>
                            </motion.div>
                        </Skeleton>) : (
                        <motion.div className={'weather-icon-and-current-temp'} variants={item}>
                            {findWeatherIcon() ? (
                                <img className={'weather-icon'} src={findWeatherIcon()} alt='Weather icon'/>) : null}
                            <p className={'current-temp'}>{Math.round(currentWeatherInfo.main.temp)}°C</p>
                        </motion.div>
                    )
                    }

                    {loading ? (
                        <Skeleton variant='rectangular' width='90%' height='250px'
                                  sx={{bgcolor: 'grey.900', borderRadius: '40px', m: 'auto'}}>
                            <motion.div className={'weather-grid'} variants={item}></motion.div>
                        </Skeleton>) : (
                        <motion.div className={'weather-grid'} variants={item}>
                            <h2>Current Weather</h2>

                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>Feels like</h3>
                                <p className={'weather-stat-numbers'}>{Math.round(currentWeatherInfo.main.feels_like)} °C</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>Wind speed</h3>
                                <p className={'weather-stat-numbers'}>{currentWeatherInfo.wind.speed} m/s</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>Visibility</h3>
                                <p className={'weather-stat-numbers'}>{currentWeatherInfo.visibility} m</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>Humidity</h3>
                                <p className={'weather-stat-numbers'}>{currentWeatherInfo.main.humidity} %</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>Lowest</h3>
                                <p className={'weather-stat-numbers'}>{Math.round(currentWeatherInfo.main.temp_min)} °C</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>Highest</h3>
                                <p className={'weather-stat-numbers'}>{Math.round(currentWeatherInfo.main.temp_max)} °C</p>
                            </div>
                        </motion.div>
                    )
                    }

                    {loading ? (
                        <Skeleton variant='rectangular' width='90%' height='250px'
                                  sx={{bgcolor: 'grey.900', borderRadius: '40px', m: 'auto', mb: '10px'}}>
                            <motion.div className={'weather-grid'} variants={item}></motion.div>
                        </Skeleton>) : (
                        <motion.div className={'weather-grid'} variants={item}>
                            <h2>Weather Forecast</h2>

                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>{forecast[0].dt_txt.slice(11, 16)}</h3>
                                <p className={'weather-stat-numbers'}>{Math.round(forecast[0].main.temp)} °C</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>{forecast[1].dt_txt.slice(11, 16)}</h3>
                                <p className={'weather-stat-numbers'}>{Math.round(forecast[1].main.temp)} °C</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>{forecast[2].dt_txt.slice(11, 16)}</h3>
                                <p className={'weather-stat-numbers'}>{Math.round(forecast[2].main.temp)} °C</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>{forecast[3].dt_txt.slice(11, 16)}</h3>
                                <p className={'weather-stat-numbers'}>{Math.round(forecast[3].main.temp)} °C</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>{forecast[4].dt_txt.slice(11, 16)}</h3>
                                <p className={'weather-stat-numbers'}>{Math.round(forecast[4].main.temp)} °C</p>
                            </div>
                            <div className={'weather-item'}>
                                <h3 className={'weather-stats'}>{forecast[5].dt_txt.slice(11, 16)}</h3>
                                <p className={'weather-stat-numbers'}>{Math.round(forecast[5].main.temp)} °C</p>
                            </div>
                        </motion.div>
                    )
                    }
                </motion.div>
            </>}
        </>
    );
}

export default WeatherDisplay;