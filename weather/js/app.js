class WeatherStation {
  constructor() {
    this.temp = null;
    this.humidity = null;
    this.pressure = null;
    this.history = [];
  }
  // ---------------------------------------------------------------------------
  updateWeatherData(temp, humidity, pressure) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.history.push({
      temp: temp,
      humidity: humidity,
      pressure: pressure,
    });
  }

  // -----------------------------------------------------------------------------

  displayWeatherForecast() {
    if (
      this.temp === null ||
      this.humidity === null ||
      this.pressure === null
    ) {
      return "No Data";
    }
    if (this.temp >= 15 && this.humidity <= 50 && this.pressure >= 750) {
      return "Sunshine";
    } else if (
      this.temp <= 15 &&
      this.humidity >= 50 &&
      this.humidity < 60 &&
      this.pressure >= 750
    ) {
      return "Rainy";
    } else if (this.temp <= 15 && this.humidity >= 60 && this.pressure >= 750) {
      return "Rain";
    }
  }
  getHistory() {
    return this.history;
  }
}
const c = new WeatherStation();
// c.updateWeatherData(20, 50, 760);
// const displayForecast = c.displayWeatherForecast();
// console.log(displayForecast);
console.log(c);

// ----------------------------------------------------------------------------------------

function showWeather() {
  document.getElementById("temp").textContent = `Temp:${c.temp}C`;
  document.getElementById("humidity").textContent = `Humidity:${c.humidity}%`;
  document.getElementById("pressure").textContent = `Pressure:${c.pressure}mm`;
  document.getElementById(
    "forecast"
  ).textContent = `Weather forecast:${c.displayWeatherForecast()}`;
}

function updateWeatherDataFromInput() {
  const tempInput = parseInt(document.getElementById("tempInput").value);
  const humidityInput = parseInt(
    document.getElementById("humidityInput").value
  );
  const pressureInput = parseInt(
    document.getElementById("pressureInput").value
  );

  if (!isNaN(tempInput) && !isNaN(humidityInput) && !isNaN(pressureInput)) {
    c.updateWeatherData(tempInput, humidityInput, pressureInput);
    showWeather();
  } else {
    console.log("error");
  }
}
document
  .getElementById("tempInput")
  .addEventListener("input", updateWeatherDataFromInput);
document
  .getElementById("humidityInput")
  .addEventListener("input", updateWeatherDataFromInput);
document
  .getElementById("pressureInput")
  .addEventListener("input", updateWeatherDataFromInput);
showWeather();
