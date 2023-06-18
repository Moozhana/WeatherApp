let currentTime = new Date();

let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let header4 = document.querySelector("h4");
header4.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  let header1 = document.querySelector("h1");
  header1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let header2 = document.querySelector(".h2");
  header2.innerHTML = temperature;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("h4");
  date.innerHTML = farmatDate(response.data.Date * 1000);
  console.log(response.data.Date * 1000);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".text").value;
  searchCity(city);
}
let search = document.querySelector(".form");
search.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let current = document.querySelector("#button-current");
current.addEventListener("click", getCurrentLocation);

searchCity("Tehran");
