const API_KEY = "b753892e4baf541ac20f62af54c786fa";
const UNITS = "metric";

// Format current date and time
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

  axios.get(apiUrl).then(showWeatherCondition);
}

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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

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
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;

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

  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

searchCity("New York");

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

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
