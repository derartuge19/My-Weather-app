function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#input-city"); // Match the input field id
  let cityElement = document.querySelector(".current-city");
  let city = searchInputElement.value;
  cityElement.innerHTML = city;

  let apiKey = "24aa0o8f50fa92cft1421f2bf2463b43";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios
    .get(apiUrl)
    .then((response) => {
      let temperature = response.data.temperature.current;
      let temperatureElement = document.querySelector(
        ".current-temperature-value"
      );
      temperatureElement.innerHTML = Math.round(temperature);

      let temperatureUnitElement = document.querySelector(
        ".current-temperature-unit"
      );
      temperatureUnitElement.innerHTML = "°C";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Add event listener to the form
let formElement = document.querySelector("form");
formElement.addEventListener("submit", search);
