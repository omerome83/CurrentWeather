const search = document.querySelector("#search");

const card = document.getElementById("weather-card");
const weatherMeasurementUnit = document.querySelector(
  ".weather-card__measurement-unit h6"
);
const weatherIcon = document.querySelector(".weather-card__icon img");
const weatherTemperature = document.querySelector(".weather-card__temperature h2");
const weatherDescription = document.querySelector(".weather-card__description h3");
const weatherLocation = document.querySelector(".weather-card__location h4");
const weatherFeelsLike = document.querySelector(".weather-card__feels-like span");
const weatherHumidity = document.querySelector(".weather-card__humidity span");

const apiKey = "72b932e7cec2a6fa6b1c0b4afa0136e5";
let city = "";

// Default Measurement Unit
let measurementUnit = "imperial";

search.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && search.value !== "") {
    city = search.value;

    weatherMeasurementUnit.textContent = measurementUnit;

    fetchWeatherDetails(city);
  }
});

weatherTemperature.addEventListener("click", () => {
  measurementUnitToggle();
});

weatherMeasurementUnit.addEventListener("click", () => {
  measurementUnitToggle();
});

const measurementUnitToggle = () => {
  if (measurementUnit === "imperial") {
    measurementUnit = "metric";
    weatherMeasurementUnit.textContent = measurementUnit;
  } else {
    measurementUnit = "imperial";
    weatherMeasurementUnit.textContent = measurementUnit;
  }

  fetchWeatherDetails(city);
};

const fetchWeatherDetails = async (city) => {
  try {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${measurementUnit}&appid=${apiKey}`;

    const response = await fetch(api);
    const data = await response.json();

    const weather = {
      temperature: data.main.temp,
      location: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon,
      country: data.sys.country,
      feels_like: data.main.feels_like,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
    };

    formatWeather(weather);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const formatWeather = (weather) => {
  const {
    temperature,
    location,
    lat,
    lon,
    country,
    description,
    feels_like,
    icon,
    humidity,
  } = weather;

  const googleMapsUrl = `https://maps.google.com/maps?q=${lat},${lon}`;

  // Displays the card after being initially set to none
  card.style.display = "grid";

  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  weatherLocation.innerHTML = `<a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer">${location}, ${country}</a>`;
  weatherTemperature.textContent = Math.round(`${temperature}`) + "°";
  weatherDescription.textContent = description;
  weatherFeelsLike.textContent = Math.round(`${feels_like}`) + "°";
  weatherHumidity.textContent = `${humidity}%`;
};
