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
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "d7973cb14cb43a087ba202bf734o0cat";
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
  let apiKey = "d7973cb14cb43a087ba202bf734o0cat";
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
