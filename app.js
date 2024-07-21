var getLocationButton = document.getElementById('get-location-button');
var cityName = document.getElementById('city-name');
var weatherDescription = document.getElementById('weather-description');
var temperature = document.getElementById('temperature');
var weatherResult = document.getElementById('weather-result');

window.addEventListener('load', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            getWeather(lat, lon);
        }, function () {
            alert('Geolocation is not supported by this browser or permission was denied.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function getWeather(lat, lon) {
    var apiKey = 'a0d2ee573bdd1eda8448fa24cbf282aa';
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityName.textContent = data.name;
            weatherDescription.textContent = data.weather[0].description;
            temperature.textContent = 'Temperature: ' + data.main.temp + ' °C';
            weatherResult.style.display = 'block';
        })
        .catch(function () {
            cityName.textContent = 'Weather information not available';
            weatherDescription.textContent = '';
            temperature.textContent = '';
            weatherResult.style.display = 'block';
        });
}