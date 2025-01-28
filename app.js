// DOM Elements - using const for better practice
const weatherCity = document.querySelector('.weather_city');
const dateTime = document.querySelector('.weather_dateNtime');
const w_forecast = document.querySelector('.weather_forecast');
const w_temperature = document.querySelector('.weather_temperature');
const w_icon = document.querySelector('.weather_icon');
const w_minTem = document.querySelector('.weather_min');
const w_maxTem = document.querySelector('.weather_max');
const w_feelslike = document.querySelector('.weather_feelslike');
const w_humidity = document.querySelector('.weather_humidity');
const w_wind = document.querySelector('.weather_wind');
const w_pressure = document.querySelector('.weather_pressure');
const citySearch = document.querySelector('.city_search');

// Default city
let currentCity = "Indore";

// Debug function to check if elements are found
const checkElements = () => {
    console.log('Checking DOM Elements:');
    console.log('weatherCity:', weatherCity);
    console.log('dateTime:', dateTime);
    console.log('w_forecast:', w_forecast);
    console.log('w_temperature:', w_temperature);
    console.log('w_icon:', w_icon);
    console.log('w_minTem:', w_minTem);
    console.log('w_maxTem:', w_maxTem);
    console.log('w_feelslike:', w_feelslike);
    console.log('w_humidity:', w_humidity);
    console.log('w_wind:', w_wind);
    console.log('w_pressure:', w_pressure);
};

// Display weather data function with debug logging
const displayWeatherData = (data) => {
    console.log('Received weather data:', data);

    try {
        const { main, name, weather, wind, sys, dt } = data;
        
        console.log('Extracted data:', { main, name, weather, wind, sys, dt });

        if (weatherCity) weatherCity.textContent = name;
        if (dateTime) dateTime.textContent = new Date(dt * 1000).toLocaleString();
        
        if (w_forecast) w_forecast.textContent = weather[0].main;
        if (w_icon) w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon"/>`;
        
        const tempInC = (main.temp - 273.15).toFixed(2);
        if (w_temperature) w_temperature.textContent = `${tempInC}°C`;
        
        const minTempInC = (main.temp_min - 273.15).toFixed(2);
        if (w_minTem) w_minTem.textContent = `Min: ${minTempInC}°C`;
        
        const maxTempInC = (main.temp_max - 273.15).toFixed(2);
        if (w_maxTem) w_maxTem.textContent = `Max: ${maxTempInC}°C`;
        
        const feelsLikeInC = (main.feels_like - 273.15).toFixed(2);
        if (w_feelslike) w_feelslike.textContent = `${feelsLikeInC}°C`;
        
        if (w_humidity) w_humidity.textContent = `${main.humidity}%`;
        if (w_wind) w_wind.textContent = `${wind.speed}m/s`;
        if (w_pressure) w_pressure.textContent = `${main.pressure}hPa`;

        console.log('Weather data displayed successfully');
    } catch (error) {
        console.error('Error in displayWeatherData:', error);
    }
};

// Get weather data function
const getWeatherData = async (cityName = currentCity) => {
    console.log('Fetching weather data for:', cityName);
    
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=a0b06669a793506ae54060f7df8a5fb6`;
        console.log('API URL:', weatherUrl);

        const response = await fetch(weatherUrl);
        console.log('API Response:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Data:', data);

        displayWeatherData(data);
        currentCity = cityName;

    } catch (error) {
        console.error('Error in getWeatherData:', error);
        if (weatherCity) {
            weatherCity.textContent = `Error fetching data for ${cityName}`;
        }
    }
};

// Search form event listener
citySearch.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Search form submitted');
    
    const cityInput = document.querySelector('.city_name');
    if (!cityInput) {
        console.error('City input element not found');
        return;
    }

    const newCity = cityInput.value.trim();
    console.log('New city search:', newCity);
    
    if (newCity) {
        getWeatherData(newCity);
        cityInput.value = '';
    }
});

// Check elements and initialize weather data on page load
window.addEventListener('load', () => {
    console.log('Page loaded');
    checkElements();
    getWeatherData();
});