function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#input-city");
  let cityElement = document.querySelector(".current-city");
  let city = searchInputElement.value;

  let apiKey = "24aa0o8f50fa92cft1421f2bf2463b43";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response);

      let temperature = response.data.temperature.current;
      let temperatureElement = document.querySelector(
        ".current-temperature-value"
      );
      temperatureElement.innerHTML = Math.round(temperature);
      cityElement.innerHTML = response.data.city;

      let temperatureUnitElement = document.querySelector(
        ".current-temperature-unit"
      );
      let iconDisplay = document.querySelector("#current-temperature-icon");
      let icon = `<img src="${response.data.condition.icon_url}" />`;
      iconDisplay.innerHTML = icon;
      let descriptionDisplay = document.querySelector("#description");
      let description = response.data.condition.description;
      descriptionDisplay.innerHTML = description;
      let humidityDisplay = document.querySelector("#humidity");
      let humidity = response.data.temperature.humidity;
      humidityDisplay.innerHTML = `${humidity}%`;
      let windDisplay = document.querySelector("#wind-speed");
      let wind = response.data.wind.speed;
      windDisplay.innerHTML = `${wind}Km/hr`;
      let date = new Date(response.data.time * 1000);
      let time = document.querySelector("#time");
      time.innerHTML = formatDate(date);

      temperatureUnitElement.innerHTML = "°C";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}, `;
}

let formElement = document.querySelector("form");
formElement.addEventListener("submit", search);
