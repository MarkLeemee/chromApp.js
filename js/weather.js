const weather = document.querySelector(".js-weather");

const API_KEY = "aaab2e1dc827874c77c629423de9b97e";
const CORDS = 'cords';

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}℃ @ ${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(CORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("eroorrr");
}

function askForCords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCords() {
    const loadedCords = localStorage.getItem(CORDS);
    if (loadedCords === null) {
        askForCords();
    } else {
        const pareCords = JSON.parse(loadedCords);
        getWeather(pareCords.latitude, pareCords.longitude);
    }
}

function init() {
    loadCords();
}

init();
