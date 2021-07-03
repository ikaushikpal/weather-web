function getCityNameLocalStorage() {
  let name = localStorage.getItem("cityName");
  return name;
}

function setCityNameLocalStorage(cityName) {
  localStorage.setItem("cityName", cityName);
}

async function changeIcon(weather, ui) {
  await weather.generateUrl();
  await weather.getWeatherIconID();
  console.log("OK");
  ui.weather = weather;
  await ui.changeAll();
  setCityNameLocalStorage(weather.weatherData.name);
  console.log(
    "from change icon " + weather.weatherData.weather[0].id + " here"
  );
}
let cityName = getCityNameLocalStorage();
let weather = new Weather(cityName);
let ui = new UI(weather);
changeIcon(weather, ui);
function togglePopup() {
  document.getElementById("popup-1").classList.toggle("active");
}

document.querySelector("#get-city").addEventListener("submit", (e) => {
  let input = document.getElementById("new-city-name");
  if (input.value === "") {
    input.value = "";
  } else {
    let city = input.value;
    input.value = "";

    let newWeather = new Weather(city);
    if (newWeather.weatherData.cod == 404) {
      input.value = "";
    } else {
      let newUi = new UI(newWeather);
      changeIcon(newWeather, newUi);
    }
    togglePopup();
  }
  e.preventDefault();
});
