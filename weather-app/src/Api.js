export const geoApiOptions = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': process.env.REACT_APP_CITIES_API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    },
    params: {
        sort: '-population'
    }
};

export const weatherApiOptions = {
    method: 'GET',
    params: {
        'appid': process.env.REACT_APP_WEATHER_API_KEY,
        'units': 'metric'
    },
};

export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'

export const CURRENT_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export const WEATHER_FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast'