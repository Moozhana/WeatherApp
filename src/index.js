function formatDate(timestamp) {
  let Time = new Date(timestamp);
  let hours = Time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = Time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[Time.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function showForecast(response) {
  let forecast = response.data.daily;
  let predictionElement = document.querySelector("#forecast");
  let predictionHTML = `<div class="col-4">`;
  forecast.forEach(function (forecastDay) {
    predictionHTML =
      predictionHTML +
      `
  <div class="row">
    <div class="col-2">${forecastDay.dt}</div>
    <div class="col-1">
      <i class="fa-solid fa-cloud-rain"></i>
    </div>
    <div class="col-5"><span class="tempMax">${forecastDay.temp.max}</span><span class="tempMin"> ${forecastDay.temp.min}</span></div>
  </div>`;
  });
  predictionHTML = predictionHTML + `</div>`;
  predictionElement.innerHTML = predictionHTML;
}

function getForecast(coords) {
  let latitude = coords.lat;
  let longitude = coords.lon;
  let apiKey = "7cb53265821867e939bc008ce978118f1";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let header1 = document.querySelector("h1");
  header1.innerHTML = response.data.name;
  tempCelsius = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = tempCelsius;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "7cb53265821867e939bc008ce978118f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#text").value;
  searchCity(city);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7cb53265821867e939bc008ce978118f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let current = document.querySelector("#current");
current.addEventListener("click", getCurrentLocation);

function displayTempFahren() {
  let temperature = document.querySelector("#temp");
  let tempFahren = (tempCelsius * 9) / 5 + 32;
  temperature.innerHTML = Math.round(tempFahren);
  let fahrenheit = document.querySelector("#fahren");
  let celsius = document.querySelector("#cels");
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}

function displayTempCels() {
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = tempCelsius;
  let fahrenheit = document.querySelector("#fahren");
  let celsius = document.querySelector("#cels");
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let tempCelsius = null;
let fahrenheit = document.querySelector("#fahren");
fahrenheit.addEventListener("click", displayTempFahren);

let celsius = document.querySelector("#cels");
celsius.addEventListener("click", displayTempCels);

searchCity("Tehran");
