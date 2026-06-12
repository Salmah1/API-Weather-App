<<<<<<< HEAD
const API_KEY = "b753892e4baf541ac20f62af54c786fa";
const UNITS = "metric";

// Format current date and time
=======
>>>>>>> 6bf91efa12cc0146ea6f2ff53f4143654fda4439
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

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

  return `${day}, ${hours}:${minutes}`;
}

<<<<<<< HEAD
// Search weather data for a city
function searchCity(city) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${API_KEY}&units=${UNITS}`;

  document.querySelector("#loading-spinner").style.display = "block";
  document.querySelector("#temperature").innerHTML = "--";
  document.querySelector("#error-message").innerHTML = "";

  axios
    .get(apiUrl)
    .then((response) => {
      document.querySelector("#loading-spinner").style.display = "none";
      showWeatherCondition(response);
    })
    .catch(() => {
      document.querySelector("#loading-spinner").style.display = "none";
      document.querySelector("#error-message").innerHTML = "City not found.";
    });
}

// Handle successful geolocation lookup
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${UNITS}`;
=======
function searchCity(city) {
  let apiKey = "b753892e4baf541ac20f62af54c786fa";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b753892e4baf541ac20f62af54c786fa";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
>>>>>>> 6bf91efa12cc0146ea6f2ff53f4143654fda4439

  axios.get(apiUrl).then(showWeatherCondition);
}

<<<<<<< HEAD
// Get user's current location
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition, showError);
}

// Display error if location access fails
function showError() {
  alert("Unable to access your location.");
}

// Format forecast hour
function formatHour(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "numeric",
    hour12: true,
  });
}

// Format forecast day
=======
function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);

  let hours = date.getHours();

  if (hours < 10) {
    hours = `${hours} AM`;
  } else {
    hours = `${hours} PM`;
  }

  return hours;
}

function getHourlyForecast(coordinates) {
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/onecall`;
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayHourlyForecast);
}

function displayHourlyForecast(response) {
  let forecast = response.data.hourly;

  let forecastElement = document.querySelector("#hourly-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `

        <div class="col card">
              <p class="mb-1">${formatHour(forecastDay.dt)}</p>
             <img id="icon"
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""

                />
              <p id="hourly-temperature">${Math.round(forecastDay.temp)}º</p>
            </div>


            
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

>>>>>>> 6bf91efa12cc0146ea6f2ff53f4143654fda4439
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

<<<<<<< HEAD
// Fetch 5-day forecast data
function getForecast(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${UNITS}`;

  axios.get(apiUrl).then(displayForecast);
}

// Render hourly and daily forecast cards
function displayForecast(response) {
  let forecastData = response.data.list;

  let hourlyHTML = "";
  let dailyHTML = "";

  // next 6 forecast periods
  for (let i = 0; i < 6; i++) {
    hourlyHTML += `
      <div class="forecast-card">
        <div>${formatHour(forecastData[i].dt)}</div>
        <img
          src="https://openweathermap.org/img/wn/${forecastData[i].weather[0].icon}.png"
          width="40"
        />
        <div>${Math.round(forecastData[i].main.temp)}°</div>
      </div>
    `;
  }

  document.querySelector("#hourly-forecast").innerHTML =
    `<div class="weather-conditions-wrapper">${hourlyHTML}</div>`;

  // every 8th item = roughly 24 hours
  for (let i = 7; i < forecastData.length; i += 8) {
    dailyHTML += `
      <div class="forecast-card">
        <div>${formatDay(forecastData[i].dt)}</div>
        <img
          src="https://openweathermap.org/img/wn/${forecastData[i].weather[0].icon}.png"
          width="40"
        />
        <div>${Math.round(forecastData[i].main.temp)}°</div>
      </div>
    `;
  }

  document.querySelector("#daily-forecast").innerHTML =
    `<div class="weather-conditions-wrapper">${dailyHTML}</div>`;
}

// Format sunrise and sunset times
function formatSunTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Update UI with current weather data
function showWeatherCondition(response) {
  document.querySelector("#error-message").innerHTML = "";

  document.querySelector("#last-updated").innerHTML =
    `Last updated: ${formatDate(Date.now())}`;

  const regionNames = new Intl.DisplayNames(["en"], {
    type: "region",
  });

  document.querySelector("#city").innerHTML =
    `${response.data.name}, ${regionNames.of(response.data.sys.country)}`;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp,
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like,
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed,
=======
function getDailyForecast(coordinates) {
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/onecall`;
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayDailyForecast);
}

function displayDailyForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#daily-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
            <div class="col card">
              <p class="mb-1">${formatDay(forecastDay.dt)}</p>
              
              <img id="icon"
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                
                />
              <p id="temperature-max">
               ${Math.round(
                 forecastDay.temp.max
               )}º <span id="temperature-min">${Math.round(
          forecastDay.temp.min
        )}º</span>
              </p>
            </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeatherCondition(response) {
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#city").innerHTML = `${response.data.name}`;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
>>>>>>> 6bf91efa12cc0146ea6f2ff53f4143654fda4439
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;

<<<<<<< HEAD
  document.querySelector("#visibility").innerHTML = (
    response.data.visibility / 1000
  ).toFixed(1);

  document.querySelector("#sunrise").innerHTML = formatSunTime(
    response.data.sys.sunrise,
  );

  document.querySelector("#sunset").innerHTML = formatSunTime(
    response.data.sys.sunset,
  );

  const weatherMain = response.data.weather[0].main;
  const main = document.querySelector(".main");

  if (weatherMain === "Clear") {
    main.style.background = "linear-gradient(135deg,#4facfe,#00f2fe)";
  } else if (weatherMain === "Clouds") {
    main.style.background = "linear-gradient(135deg,#757f9a,#d7dde8)";
  } else if (weatherMain === "Rain") {
    main.style.background = "linear-gradient(135deg,#2b5876,#4e4376)";
  } else if (weatherMain === "Snow") {
    main.style.background = "linear-gradient(500deg, #e6dada 0%, #274046 100%)";
  } else if (weatherMain === "Thunderstorm") {
    main.style.background = "linear-gradient(500deg, #141e30 0%, #243b55 100%)";
  } else {
    main.style.background = "linear-gradient(500deg, #d98324 0%, #a40606 74%)";
  }

  getForecast(response.data.name);
=======
  document.querySelector("#visibility").innerHTML = response.data.visibility;
>>>>>>> 6bf91efa12cc0146ea6f2ff53f4143654fda4439

  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
<<<<<<< HEAD
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

=======
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getDailyForecast(response.data.coord);

  getHourlyForecast(response.data.coord);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

>>>>>>> 6bf91efa12cc0146ea6f2ff53f4143654fda4439
searchCity("New York");

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);
<<<<<<< HEAD

document.querySelector("#search-input").focus();

// Live filtering
let searchTimeout;
let currentCity = "";

document
  .querySelector("#search-input")
  .addEventListener("input", function (event) {
    clearTimeout(searchTimeout);

    let city = event.target.value.trim();

    if (city.length < 3 || city === currentCity) {
      return;
    }

    searchTimeout = setTimeout(() => {
      currentCity = city;
      searchCity(city);
    }, 700);
  });
=======
>>>>>>> 6bf91efa12cc0146ea6f2ff53f4143654fda4439
