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
            // tags for html elements
            var today = document.querySelector('#today') 
            var history = document.querySelector('#history') 
            var Day1 = document.querySelector('#Day1') 
            var Day2 = document.querySelector('#Day2') 
            var Day3 = document.querySelector('#Day3') 
            var Day4 = document.querySelector('#Day4') 
            var Day5 = document.querySelector('#Day5')
            // create elements to add to html when data pulled  
            var pTemp = document.createElement('p')
            var pWind = document.createElement('p')
            var pHumid = document.createElement('p')
            var cityName = document.createElement('h2')
            // append current weather data
            today.appendChild(pTemp)
            today.appendChild(pWind)
            today.appendChild(pHumid)
            
            history.appendChild(cityName)
            
            // convert temp from Kelvin to Fahrenheit F = 1.8*(K-273) + 32.
            // displaying data on html page
            var pTempF = 1.8*(Number(data.main.temp) -273) + 32
            pTempF = Math.round(pTempF)
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
                    console.log(Math.round(1.8*((data.list[0].main.temp)-273)+32))
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
            Day1.appendChild(day1Temp) //Day1
            Day1.appendChild(day1Humid)
            Day1.appendChild(day1Wind)
            Day2.appendChild(day2Temp) //day2
            Day2.appendChild(day2Wind)
            Day2.appendChild(day2Humid)
            Day3.appendChild(day3Temp) // day3
            Day3.appendChild(day3Wind)
            Day3.appendChild(day3Humid)
            Day4.appendChild(day4Temp) //day4
            Day4.appendChild(day4Wind)
            Day4.appendChild(day4Humid)
            Day5.appendChild(day5Wind) //day5
            Day5.appendChild(day5Temp)
            Day5.appendChild(day5Humid)
            // var forecastTemp = [day1Temp, day2Temp, day3Temp, day4Temp, day5Temp]
        //     forecastTemp = 1.8*(Number(data.list[8].main.temp) -273) + 32
        //     forecastTemp = Math.round(forecastTemp *10 )/10 
                console.log(day1Temp)

        // display data to html                                     //first temp
            day1Temp.innerHTML = Math.round(1.8*((data.list[8].main.temp)-273)+32) + " °F";
            day2Temp.innerHTML = Math.round(1.8*((data.list[15].main.temp)-273)+32) + " °F";
            day3Temp.innerHTML = Math.round(1.8*((data.list[21].main.temp)-273)+32) + " °F";
            day4Temp.innerHTML = Math.round(1.8*((data.list[33].main.temp)-273)+32) + " °F";
            day5Temp.innerHTML = Math.round(1.8*((data.list[39].main.temp)-273)+32) + " °F";
            day1Wind.innerHTML = data.list[8].wind.speed + " mph"  //wind speeds
            day2Wind.innerHTML = data.list[15].wind.speed + " mph"
            day3Wind.innerHTML = data.list[21].wind.speed + " mph"
            day4Wind.innerHTML = data.list[33].wind.speed + " mph"
            day5Wind.innerHTML = data.list[39].wind.speed + " mph"
            day1Humid.innerHTML = data.list[8].main.humidity + " %"  //humidities
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