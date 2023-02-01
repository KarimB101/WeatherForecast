// Global Elements
var WeatherKey = "c171672f4bbc8048bf259a3ea61decb1"
var city;
var cityInput = document.querySelector('#city')
var searchBtn = document.querySelector('#searchBtn')


// DOM elements 
var searchForm = document.querySelector('.city-form')
var cityInput = document.querySelector('#city')
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history');

// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// Function to display the current weather
function renderCurrentWeather(city, weather) {
    var date = dayjs().format('M/D/YYYY');
    // Store response data from our fetch request in variables
    var tempF = weather.main.temp;
    var windMph = weather.wind.speed;
    var humidity = weather.main.humidity;
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var iconDescription = weather.weather[0].description || weather[0].main;
}

function getWeather() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c171672f4bbc8048bf259a3ea61decb1"
    console.log(queryURL)

    fetch(queryURL)
        .then(response => response.json()) 
        .then(data => {
            console.log(data.main.temp)
            console.log(data.wind.speed)
            console.log(data.main.humidity)
            var today = document.querySelector('#today') 
            var pTemp = document.createElement('p')
            var pWind = document.createElement('p')
            var pHumid = document.createElement('p')
            
            // convert temp from Kelvin to Fahrenheit F = 1.8*(K-273) + 32.
            var pTempF = 1.8*(Number(data.main.temp) -273) + 32
            pTempF = Math.round(pTempF *10 )/10
            pTemp.textContent = pTempF + " " + "°F"
            pWind.textContent = data.wind.speed + " " + "mph"
            pHumid.textContent = data.main.humidity + " " + "%"
            
          //  pTemp.document.append('p')
                today.appendChild(pTemp)
                today.appendChild(pWind)
                today.appendChild(pHumid) 
            // storing data in local storage

                localStorage.setItem(city + "-" + "tempF", pTempF)
                localStorage.setItem(city + "-" + "windMph", data.wind.speed)
                localStorage.setItem(city + "-" + "humidity", data.main.humidity)
                
         })
            
        }
        
        // keeps data on page
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    city = cityInput.value;

    getWeather();
})

// function for displaying search history
function renderSearchHistory() {
    searchHistoryContainer.innerHTML = '';

}

// function to get 5 day weather forecast
function getForecast(){
    var forecastURL = "api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=c171672f4bbc8048bf259a3ea61decb1"
    console.log(forecastURL)

    fetch(queryURL)
        .then(response => response.json()) 
        .then(data => 

        searchBtn.addEventListener('click', function (event) {
            event.preventDefault();
        
})
)}
