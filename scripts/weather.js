class Weather {
  constructor(cityName) {
    this.weatherData = "";
    this.cityName = cityName;
    this.apiKey = "16ffb5ac84a40f3e37eaa037e952bdf1";
    this.weatherIconID = "";
    this.weather = "";
  }
  generateUrl() {
    this.url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      this.cityName +
      "&appid=" +
      this.apiKey;
  }

  async getWeatherInfo() {
    this.weather = new EasyHttp();
    this.weatherData = await this.weather
      .get(this.url)
      .then((data) => {
        console.log("successfully Got data");
        return data;
      })
      .catch((error) => {
        console.log("Something Went Wrong at fetching data " + error);
        return "";
      });
  }

  async getWeatherIconID() {
    const getData = await this.getWeatherInfo();
    let easyhttp = new EasyHttp();
    let icon;
    const first = await easyhttp.get("scripts/icon.json").then((data) => {
      icon = data[this.weatherData.weather[0].id].icon;
    });

    const date = new Date();
    const sunrise = new Date(this.weatherData.sys.sunrise * 1000);
    const sunset = new Date(this.weatherData.sys.sunset * 1000);

    if (
      date.getHours() >= sunrise.getHours() &&
      date.getHours() < sunset.getHours()
    ) {
      this.weatherIconID = `wi wi-day-${icon}`;
    } else if (
      date.getHours() >= sunset.getHours() ||
      date.getHours() < sunrise.getHours()
    ) {
      this.weatherIconID = `wi wi-night-${icon}`;
    }
    console.log("okay 2");
  }
}
