
export const geoApiOptions = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': process.env.REACT_APP_CITIES_API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

export const geocodingApiOptions = {
    method: 'GET',
    params: {
        'appid': process.env.REACT_APP_GEOCODING_API_KEY,
        'limit': '1'
    }
}

export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'

export const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/direct?'