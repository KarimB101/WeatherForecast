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
            // console.log(data.main.temp)
            // console.log(data.wind.speed)
            // console.log(data.main.humidity)
            var today = document.querySelector('#today') 
            var pTemp = document.createElement('p')
            var pWind = document.createElement('p')
            var pHumid = document.createElement('p')
            var cityName = document.createElement('h2')

            today.appendChild(pTemp)
            today.appendChild(pWind)
            today.appendChild(pHumid)
            today.appendChild(cityName)
            
            // convert temp from Kelvin to Fahrenheit F = 1.8*(K-273) + 32.
            // displaying data on html page
            var pTempF = 1.8*(Number(data.main.temp) -273) + 32
            pTempF = Math.round(pTempF *10 )/10
            pTemp.textContent = pTempF + " " + "°F"
            pWind.textContent = data.wind.speed + " " + "mph"
            pHumid.textContent = data.main.humidity + " " + "%"
            cityName.textContent = city


            
          //  pTemp.document.append('p')
                today.appendChild(pTemp)
                today.appendChild(pWind)
                today.appendChild(pHumid) 
            // storing data in local storage

                localStorage.setItem(city + "-" + "tempF", pTempF)
                localStorage.setItem(city + "-" + "windMph", data.wind.speed)
                localStorage.setItem(city + "-" + "humidity", data.main.humidity)
            })
          
            // function to get 5 day weather forecast 
            // function getForecast(){
            var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c171672f4bbc8048bf259a3ea61decb1"
            console.log(forecastURL)

            fetch(forecastURL)
                .then(response => response.json()) 
                .then(data => {
                    console.log(data.list[0].wind.speed)
                    console.log(data.list[0].main.temp)
                    console.log(data.list[0].main.humidity)
                    console.dir(data)

                     // Create object that stores all 3-hour forecasts
                    const allForecasts = {};
            data.list.map((threeHourForecast) => {
                const date = new Date(threeHourForecast.dt * 1000);
                allForecasts[date] = threeHourForecast;
            });

            //Grab area to post forecast data
            var forecastContainer = document.querySelector('#forecast') 
            // create elements for forecast data
            
            var day1Temp  = document.createElement('p') 
            var day2Temp = document.createElement('p')
            var day3Temp = document.createElement('p')
            var day4Temp = document.createElement('p')
            var day5Temp = document.createElement('p')
            var day1Wind = document.createElement('p')
            var day2Wind = document.createElement('p')
            var day3Wind = document.createElement('p')
            var day4Wind = document.createElement('p')
            var day5Wind = document.createElement('p')
            var day1Humid = document.createElement('p')
            var day2Humid = document.createElement('p')
            var day3Humid = document.createElement('p')
            var day4Humid = document.createElement('p')
            var day5Humid = document.createElement('p')
        
            // append children to forecast Element
            forecastContainer.appendChild(day1Temp) 
            forecastContainer.appendChild(day2Temp)
            forecastContainer.appendChild(day3Temp)
            forecastContainer.appendChild(day4Temp)
            forecastContainer.appendChild(day5Temp)
            forecastContainer.appendChild(day1Wind)
            forecastContainer.appendChild(day2Wind)
            forecastContainer.appendChild(day3Wind)
            forecastContainer.appendChild(day4Wind)
            forecastContainer.appendChild(day5Wind)
            forecastContainer.appendChild(day1Humid)
            forecastContainer.appendChild(day2Humid)
            forecastContainer.appendChild(day3Humid)
            forecastContainer.appendChild(day4Humid)
            forecastContainer.appendChild(day5Humid)
            // var forecastTemp = [day1Temp, day2Temp, day3Temp, day4Temp, day5Temp]
        //     forecastTemp = 1.8*(Number(data.list[8].main.temp) -273) + 32
        //     forecastTemp = Math.round(forecastTemp *10 )/10 
                console.log(day1Temp)

        // display data to html
            day1Temp.innerHTML = data.list[8].main.temp + " °F";
            day2Temp.innerHTML = data.list[15].main.temp + " °F";
            day3Temp.innerHTML = data.list[21].main.temp + " °F";
            day4Temp.innerHTML = data.list[33].main.temp + " °F";
            day5Temp.innerHTML = data.list[39].main.temp + " °F";
            day1Wind.innerHTML = data.list[8].wind.speed + " mph"
            day2Wind.innerHTML = data.list[15].wind.speed + " mph"
            day3Wind.innerHTML = data.list[21].wind.speed + " mph"
            day4Wind.innerHTML = data.list[33].wind.speed + " mph"
            day5Wind.innerHTML = data.list[39].wind.speed + " mph"
            day1Humid.innerHTML = data.list[8].main.humidity + " %"
            day2Humid.innerHTML = data.list[15].main.humidity + " %"
            day3Humid.innerHTML = data.list[21].main.humidity + " %"
            day4Humid.innerHTML = data.list[33].main.humidity + " %"
            day5Humid.innerHTML = data.list[38].main.humidity + " %"

                    searchBtn.addEventListener('click', function (event) {
                    event.preventDefault();
                })
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
    };