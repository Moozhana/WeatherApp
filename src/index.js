function formatDate(timestamp) {
  let Time = new Date(timestamp);
  let hours = Time.getHours();
  let minutes = Time.getMinutes();
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
  let temperature = Math.round(response.data.main.temp);
  let header2 = document.querySelector(".h2");
  header2.innerHTML = temperature;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector(".date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data);
  let descriptionElement = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
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
