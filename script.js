const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

async function getCoords(city){
    const url = `${GEO_URL}?name=${city}&count=1`
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Geocoding failed (status ${response.status})`);
    }
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
        return null;
    }

    const place = data.results[0];
    return {
        name: place.name,
        country: place.country,
        lat: place.latitude,
        lon: place.longitude,
    };
    console.log(data)
}

async function getWeather(lat, lon) {
  const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather failed (status ${response.status})`);
  }

  const data = await response.json();
  return {
    temp: data.current.temperature_2m,
    wind: data.current.wind_speed_10m,
  };
}

const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const message = document.getElementById('message');
const card = document.getElementById('card');