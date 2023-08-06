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
  let roundTemp = Math.round(response.data.main.temp);
  curCity.innerHTML = response.data.name;
  curTemp.innerHTML = `${roundTemp} `;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);

searchForCity("Berlin");
