class WeatherStation {
  constructor() {
    this.temp = null;
    this.humidity = null;
    this.pressure = null;
    this.history = [];
  }
  // ---------------------
  updateWeatherData(temp, humidity, pressure) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.history = `temp:${temp}C, humidity:${humidity}%, pressure:${pressure}mm`;
  }

  // -----------------

  displayWeatherForecast() {
    if (
      this.temp === null ||
      this.humidity === null ||
      this.pressure === null
    ) {
      console.log("No data");
    }
    if (
      (this.temp >= 15 && this.humidity <= 50 && this.pressure >= 750) ||
      this.pressure <= 760
    ) {
      console.log("Sunshine");
    } else if (
      (this.temp <= 15 &&
        this.humidity >= 50 &&
        this.humidity < 60 &&
        this.pressure >= 750) ||
      this.pressure <= 760
    ) {
      console.log("Rainy");
    } else if (
      (this.temp <= 15 && this.humidity >= 60 && this.pressure >= 750) ||
      this.pressure <= 760
    ) {
      console.log("Rain");
    }
  }
}
const c = new WeatherStation();
c.updateWeatherData(20,50,760);
c.displayWeatherForecast();
console.log(c);

// -------

function showWeather() {
  document.getElementById("temp").textContent = `Temp:${c.temp}C`;
  document.getElementById("humidity").textContent = `Humidity:${c.humidity}%`;
  document.getElementById("pressure").textContent = `Pressure:${c.pressure}mm`;
  document.getElementById("history").textContent = `History:${c.history}`

}
showWeather();
