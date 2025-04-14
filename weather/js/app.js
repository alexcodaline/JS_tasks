class WeatherStation {
  constructor() {
    this.temp = null;
    this.humidity = null;
    this.pressure = null;
    this.history = [];
  }

  updateWeatherData(temp, humidity, pressure, icon = null) {
    this.temp = temp;
    this.humidity = humidity;
    this.pressure = pressure;

    const now = new Date();
    this.history.push({
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      temp: temp,
      humidity: humidity,
      pressure: pressure,
      forecast: this.getForecastByData(temp, humidity, pressure),
      icon: icon,
    });

    this.updateHistoryDisplay();
  }

  displayWeatherForecast() {
    if (
      this.temp === null ||
      this.humidity === null ||
      this.pressure === null
    ) {
      return "No Data";
    }
    return this.getForecastByData(this.temp, this.humidity, this.pressure);
  }

  getForecastByData(temp, humidity, pressure) {
    if (temp >= 15 && humidity <= 50 && pressure >= 750) {
      return "Sunshine";
    } else if (
      temp <= 15 &&
      humidity >= 50 &&
      humidity < 60 &&
      pressure >= 750
    ) {
      return "Rainy";
    } else if (temp <= 15 && humidity >= 60 && pressure >= 750) {
      return "Rain";
    } else {
      return "Cloudy";
    }
  }

  getHistory() {
    return this.history;
  }

  updateHistoryDisplay() {
    let historySection = document.querySelector(".weather-history");
    if (!historySection) {
      historySection = document.createElement("div");
      historySection.className = "weather-history";
      document.body.appendChild(historySection);
    }

    historySection.innerHTML = "<h2>Weather History</h2>";

    if (this.history.length === 0) {
      historySection.innerHTML += "<p>No history data yet</p>";
      return;
    }

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "10px";

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2">Date</th>
      <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2">Time</th>
      <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2">Temperature (°C)</th>
      <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2">Humidity (%)</th>
      <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2">Pressure (mm)</th>
      <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2">Forecast</th>
      <th style="border:1px solid #ddd;padding:8px;background-color:#f2f2f2">Icon</th>
    `;
    table.appendChild(headerRow);

    const recentHistory = this.history.slice(-10).reverse();

    recentHistory.forEach((record) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="border:1px solid #ddd;padding:8px">${record.date}</td>
        <td style="border:1px solid #ddd;padding:8px">${record.time}</td>
        <td style="border:1px solid #ddd;padding:8px">${record.temp}</td>
        <td style="border:1px solid #ddd;padding:8px">${record.humidity}</td>
        <td style="border:1px solid #ddd;padding:8px">${record.pressure}</td>
        <td style="border:1px solid #ddd;padding:8px">${record.forecast}</td>
        <td style="border:1px solid #ddd;padding:8px">
  ${
    record.icon
      ? `<img src="https://openweathermap.org/img/wn/${record.icon}.png" alt="${record.forecast}" />`
      : "N/A"
  }
</td>
      `;
      table.appendChild(row);
    });

    historySection.appendChild(table);
  }
}

const weatherStation = new WeatherStation();

function showWeather() {
  document.getElementById("temp").textContent = `Temp: ${
    weatherStation.temp !== null ? weatherStation.temp + "°C" : "N/A"
  }`;
  document.getElementById("humidity").textContent = `Humidity: ${
    weatherStation.humidity !== null ? weatherStation.humidity + "%" : "N/A"
  }`;
  document.getElementById("pressure").textContent = `Pressure: ${
    weatherStation.pressure !== null ? weatherStation.pressure + "mm" : "N/A"
  }`;
  document.getElementById(
    "forecast"
  ).textContent = `Weather forecast: ${weatherStation.displayWeatherForecast()}`;
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
    weatherStation.updateWeatherData(tempInput, humidityInput, pressureInput);
    showWeather();
    console.log("Weather data updated:", {
      temp: tempInput,
      humidity: humidityInput,
      pressure: pressureInput,
    });
    console.log("Current history:", weatherStation.getHistory());
  } else {
    console.log("Error: invalid input values");
  }
}

function clearHistory() {
  weatherStation.history = [];
  weatherStation.updateHistoryDisplay();
  console.log("History cleared");
}

window.onload = function () {
  console.log("Page loaded");

  const submitButton = document.getElementById("submit-weather");
  if (submitButton) {
    submitButton.addEventListener("click", function () {
      console.log("Submit button clicked");
      updateWeatherDataFromInput();
    });
  } else {
    console.error("Submit button not found");
  }

  const clearButton = document.getElementById("clear-history");
  if (clearButton) {
    clearButton.addEventListener("click", function () {
      console.log("Clear button clicked");
      clearHistory();
    });
  } else {
    console.error("Clear button not found");
  }

  showWeather();
};

// додав погоду мого місця проживання
async function fetchWeatherData(city = "Kyiv") {
  const apiKey = "dce7d0f050dd528f500f96eedfc42db5";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching weather data");

    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const humidity = Math.round(data.main.humidity);
    const pressure = Math.round(data.main.pressure * 0.750062);
    const icon = data.weather[0].icon;
    weatherStation.updateWeatherData(temp, humidity, pressure, icon);
    showWeather();

    console.log("Real weather data:", { temp, humidity, pressure });
  } catch (error) {
    console.error("Fetch weather error:", error);
  }
}
const realButton = document.getElementById("fetch-real-weather");
if (realButton) {
  realButton.addEventListener("click", function () {
    fetchWeatherData("Kyiv");
  });
}
