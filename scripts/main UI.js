class UI {
  constructor(weather) {
    this.tempIcon = document.getElementById("temp-icon");
    this.currentTemp = document.getElementById("current-temp");
    this.weather = weather;
    this.cityName = document.getElementById("city-Name");
    this.currentTime = document.getElementById("current-time");
    this.days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  }
  getDirection(deg) {
    if (deg > 11.25 && deg < 33.75) {
      return "NNE";
    } else if (deg > 33.75 && deg < 56.25) {
      return "ENE";
    } else if (deg > 56.25 && deg < 78.75) {
      return "E";
    } else if (deg > 78.75 && deg < 101.25) {
      return "ESE";
    } else if (deg > 101.25 && deg < 123.75) {
      return "ESE";
    } else if (deg > 123.75 && deg < 146.25) {
      return "SE";
    } else if (deg > 146.25 && deg < 168.75) {
      return "SSE";
    } else if (deg > 168.75 && deg < 191.25) {
      return "S";
    } else if (deg > 191.25 && deg < 213.75) {
      return "SSW";
    } else if (deg > 213.75 && deg < 236.25) {
      return "SW";
    } else if (deg > 236.25 && deg < 258.75) {
      return "WSW";
    } else if (deg > 258.75 && deg < 281.25) {
      return "W";
    } else if (deg > 281.25 && deg < 303.75) {
      return "WNW";
    } else if (deg > 303.75 && deg < 326.25) {
      return "NW";
    } else if (deg > 326.25 && deg < 348.75) {
      return "NNW";
    } else {
      return "N";
    }
  }
  getMinutes(time) {
    if (time < 10) return "0" + time;
    else return time;
  }
  async changeUpperSection() {
    this.cityName.innerText = `${this.weather.weatherData.name}, ${this.weather.weatherData.sys.country}`;
    let time = new Date(),
      str = "";
    if (time.getHours() >= 12)
      str = `${time.getHours() - 12}:${time.getMinutes()} PM, `;
    else str = `${time.getHours()}:${this.getMinutes(time.getMinutes())} AM, `;
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    this.currentTime.innerText = `${str}${this.days[time.getDay()]} ${
      months[time.getMonth()]
    } ${time.getDate()}`;
    console.log("okay 4" + this.currentTime.innerText);
  }
  async changeMiddleSection() {
    document.getElementById("fell").innerText = `Feels Like : ${Math.ceil(
      this.weather.weatherData.main.feels_like - 273
    )}°c`;

    document.getElementById(
      "humidity"
    ).innerText = `Humidity : ${this.weather.weatherData.main.humidity}%`;

    document.getElementById("Wind").innerText = `Wind From ${this.getDirection(
      this.weather.weatherData.wind.deg
    )} @ ${Math.ceil(this.weather.weatherData.wind.speed * 3.6)} KMPH`;

    document.getElementById(
      "pressure"
    ).innerText = `Pressure : ${this.weather.weatherData.main.pressure} hPa`;
  }
  async changeSideSection() {
    this.tempIcon.className = this.weather.weatherIconID;

    this.currentTemp.innerHTML =
      Math.ceil(this.weather.weatherData.main.temp - 273) + " °C";
    this.temp = Math.ceil(this.weather.weatherData.main.temp - 273);
  }
  async getWeekIcons(id) {
    let easyhttp = new EasyHttp();
    let icon, weatherIconID;
    const first = await easyhttp.get("scripts/icon.json").then((data) => {
      icon = data[id].icon;
    });
    weatherIconID = `wi wi-day-${icon}`;
    console.log(weatherIconID);
    return weatherIconID;
  }
  async changeBottomSection() {
    let url =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      this.weather.weatherData.coord.lat +
      "&lon=" +
      this.weather.weatherData.coord.lon +
      "&exclude=hourly,minutely,current,alerts&appid=16ffb5ac84a40f3e37eaa037e952bdf1";
    let otherWeather = new Weather(weather.cityName);
    otherWeather.url = url;
    await otherWeather.getWeatherInfo();
    let data = otherWeather.weatherData.daily;
    console.log(data);
    this.anotherWeather = otherWeather;
    // changing UV index and max-min
    document.getElementById("dew-point").innerText = `Dew Point : ${Math.ceil(
      this.anotherWeather.weatherData.daily[0].dew_point - 273
    )}°c`;

    document.getElementById("min-max-temp").innerHTML = `${Math.floor(
      this.anotherWeather.weatherData.daily[0].temp.max - 273
    )} ° / ${Math.ceil(
      this.anotherWeather.weatherData.daily[0].temp.min - 273
    )} °`;

    document.getElementById(
      "uv-index"
    ).innerHTML = `UV-Index : ${this.anotherWeather.weatherData.daily[0].uvi}`;
    for (let i = 1; i <= 7; i++) {
      let str = "day-" + i;
      let mainDiv = document.getElementById(str),
        time = new Date(
          data[i - 1].dt * 1000 + otherWeather.weatherData.timezone_offset
        );
      if (i == 1) {
        mainDiv.innerHTML = `<h2 class="pd-1">${this.days[time.getDay()]}</h2>
            <i class="${await this.getWeekIcons(
              data[i - 1].weather[0].id
            )} fs-1"></i>
            <h2 class="pd-1">${this.temp} °C</h2>`;
      } else {
        mainDiv.innerHTML = `<h2 class="pd-1">${this.days[time.getDay()]}</h2>
            <i class="${await this.getWeekIcons(
              data[i - 1].weather[0].id
            )} fs-1"></i>
            <h2 class="pd-1">${Math.floor(data[i - 1].temp.day - 273)} °C</h2>`;
      }
    }
  }
  async changeAll() {
    this.changeUpperSection();
    this.changeMiddleSection();
    await this.changeSideSection();
    this.changeBottomSection();

    // document.getElementById().innerText = `${this.weather.weatherData.main}`;
  }
}
