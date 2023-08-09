let now = new Date();

function formatHour() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return hours;
}
function formatMinute() {
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return minutes;
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
let day = days[now.getDay()];
let crDay = document.querySelector("#current-date-time");

crDay.innerHTML = `${day} | ${formatHour()}:${formatMinute()}`;
//

let crCity = document.querySelector("#cur-city");
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-weather");
  if (searchInput.value) {
    crCity.innerHTML = `${searchInput.value}`;
  } else {
    crCity.innerHTML = `Please enter a city!`;
  }
}
//

function crTemp(response) {
  let curCity = document.querySelector("#cur-city");
  let curTemp = document.querySelector("#temp");
  let curDescription = document.querySelector("#weather-description");
  let curHumidity = document.querySelector("#humidity");
  let curWind = document.querySelector("#wind");
  let roundTemp = Math.round(response.data.main.temp);
  let curIcon = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  curCity.innerHTML = response.data.name;
  curTemp.innerHTML = `${roundTemp} `;
  curDescription.innerHTML = response.data.weather[0].description;
  curHumidity.innerHTML = response.data.main.humidity;
  curWind.innerHTML = Math.round(response.data.wind.speed);
  curIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  curIcon.setAttribute("alt", response.data.weather[0].description);
}

function searchForCity(city) {
  let apiKey = "4181c6f0469d9600bd1a5d46cb095d15";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(crTemp);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-weather").value;
  searchForCity(city);
}

function searchForLocation(position) {
  let apiKey = "4181c6f0469d9600bd1a5d46cb095d15";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(crTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchForLocation);
}
//

function dispalyFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  tempElement.innerHTML = fahrenheitTemp;
}

let celsiusTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", dispalyFahrenheitTemp);
searchForCity("Berlin");
