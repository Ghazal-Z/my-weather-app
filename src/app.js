function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} | ${hours}:${minutes}`;
}

function forecastDays(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let forecastDay = forecastDate.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[forecastDay];
}
//
function displayForecast(response) {
  let forecast = response.data.daily;

  let currentForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="weather-forecast-date">${forecastDays(
              forecastDay.dt
            )}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }.png"
              alt=""
              width="50"
            />
            <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  currentForecast.innerHTML = forecastHTML;
}

//
function getForecast(coordinates) {
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
function crTemp(response) {
  let curCity = document.querySelector("#cur-city");
  let curTemp = document.querySelector("#temp");
  let curDescription = document.querySelector("#weather-description");
  let curHumidity = document.querySelector("#humidity");
  let curWind = document.querySelector("#wind");
  let roundTemp = Math.round(response.data.main.temp);
  let curIcon = document.querySelector("#icon");
  let dateElement = document.querySelector("#cur-date");

  celsiusTemp = response.data.main.temp;

  curCity.innerHTML = response.data.name;
  curTemp.innerHTML = `${roundTemp} `;
  curDescription.innerHTML = response.data.weather[0].description;
  curHumidity.innerHTML = response.data.main.humidity;
  curWind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  curIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  curIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchForCity(city) {
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(crTemp);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-weather").value;
  celsiusiLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
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
  //remove active class form celsius link
  celsiusiLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  tempElement.innerHTML = fahrenheitTemp;
}

function dispalyCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");

  //add active class form celsius link
  celsiusiLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", dispalyFahrenheitTemp);

let celsiusiLink = document.querySelector("#celsius-link");
celsiusiLink.addEventListener("click", dispalyCelsiusTemp);

searchForCity("Berlin");
