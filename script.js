const search = document.querySelector("#search");
const card = document.getElementById("weather-card");
const weatherIcon = document.querySelector(".weather-card__icon img");
const weatherTemperature = document.querySelector(".weather-card__temperature h2");
const weatherDescription = document.querySelector(".weather-card__description h3");
const weatherLocation = document.querySelector(".weather-card__location h3");
const weatherFeelsLike = document.querySelector(".weather-card__feels-like h4");
const weatherHumidity = document.querySelector(".weather-card__humidity h4");

const apiKey = `72b932e7cec2a6fa6b1c0b4afa0136e5`;

search.addEventListener("keypress", (e) => {
  let city = "";

  if (e.key === "Enter" && search.value !== "") {
    city = search.value;

    fetchWeatherDetails(city).catch((err) => console.log(err));
  }
});

// const getCity = () => {

// };

const fetchWeatherDetails = async (city) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  const response = await fetch(api);
  const data = await response.json();

  console.log(data);

  const weather = {
    temp: data.main.temp,
    location: data.name,
    temp_high: data.main.temp_max,
    temp_low: data.main.temp_min,
    feels_like: data.main.feels_like,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
  };

  formatWeather(weather);
};

// let city = getCity();

const formatWeather = (weather) => {
  const {
    temp,
    location,
    temp_high,
    temp_low,
    description,
    feels_like,
    icon,
    humidity,
  } = weather;

  card.style.display = "grid";

  const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;

  weatherIcon.src = weatherIconUrl;
  weatherLocation.innerHTML = location;

  let roundedTempeature = Math.round(temp);
  let roundedFeelsLike = Math.round(feels_like);

  weatherTemperature.innerHTML = `${roundedTempeature}°`;
  weatherDescription.innerHTML = description;
  // weatherFeelsLike.innerHTML = `${roundedFeelsLike}°`;
  // weatherHumidity.innerHTML = humidity + "%";
};
// Inside addeventlistener
// let city = cityText.innerHTML;
