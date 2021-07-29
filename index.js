function timeStamp(event) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  let days = now.getDay();
  let today = weeks[days];
  let allMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let months = now.getMonth();
  let currentMonth = allMonth[months];
  return `${currentMonth} ${today}, ${hours}:${minutes}`;
}

let detailsChange = document.querySelector("#currentDetails");
let now = new Date();
detailsChange.innerHTML = timeStamp(now);
console.log(timeStamp(now));

function cityDetails(event) {
  event.preventDefault();
  let townChange = document.querySelector("#city-change");
  let toCity = document.querySelector("#updateCity-id");
  toCity.innerHTML = `${townChange.value}`;
}
let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", cityDetails);

let temper = document.querySelector("#temp");

function celToFah(event) {
  event.preventDefault();
  let fahrenheit = Math.round(20 * (9 / 5) + 32);
  let temper = document.querySelector("#temp");
  temper.innerHTML = `${fahrenheit}`;
}

function fahToCel(event) {
  event.preventDefault();
  let celsius = Math.round((68 - 32) * (5 / 9));
  let temper = document.querySelector("#temp");
  temper.innerHTML = `${celsius}`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", celToFah);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", fahToCel);

function nowConditions(response) {
  let presentTemp = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = presentTemp;
  let presentForecast = response.data.weather[0].description;
  document.querySelector("#climate").innerHTML = presentForecast.toUpperCase();
  let speedOfwind = Math.round(response.data.wind.speed);
  document.querySelector("#wind_force").innerHTML = speedOfwind;
  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humid").innerHTML = humidity;
  let realFeels = Math.round(response.data.main.feels_like);
  document.querySelector("#feels").innerHTML = realFeels;
  if (presentForecast.includes("clouds")) {
    document.querySelector("#emojis").innerHTML = "☁️";
  }
  if (presentForecast.includes("sky")) {
    document.querySelector("#emojis").innerHTML = "☀️";
  }
  if (presentForecast.includes("rain")) {
    document.querySelector("#emojis").innerHTML = "🌧";
  }
}

function cityLookup(city) {
  let apiKey = "56db1fa98457edda6eb57bb6a4699df0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(nowConditions);
}

function searchEngine(event) {
  console.log("I am here");
  event.preventDefault();
  let city = document.querySelector("#city-change").value;
  cityLookup(city);
}

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", searchEngine);

//bonus points

function currentPosition(position) {
  let apiKey = "56db1fa98457edda6eb57bb6a4699df0";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat);
  console.log(long);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(url).then(nowConditions);
}
navigator.geolocation.getCurrentPosition(currentPosition);