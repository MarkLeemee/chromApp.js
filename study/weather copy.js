const weather = document.querySelector(".js-weather");

const API_KEY = "aaab2e1dc827874c77c629423de9b97e";
const CORDS = 'cords';

function getWeather(lat, lon) {
    // API 서비스 가져오기
    // 특정 URL 호출. 웹사이트로 request를 보내고 refresh없이 실시간으로 데이터를 받아 적용
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        // then은 "데이터를 완전히 가져온 후" 함수를 호출
        .then(function (response) {
            return response.json();
        })
        // 돌려받은 내용 중에서 Obj로 처리하여 가져옴
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(CORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    // 위도와 경도 읽어오기
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        // 객체의 변수이름과 key값이 같을때 이하와 같이 생략하여 표현 가능
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
    // 현재 좌표 가져오기
    // 못가져올 시에는 handleGeoError함수 호출
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCords() {
    // localStorage에서 가져오기. 이때는 string 타입상태.
    const loadedCords = localStorage.getItem(CORDS);
    if (loadedCords === null) {
        askForCords();
    } else {
        // string 타입을 객체로 변환
        const pareCords = JSON.parse(loadedCords);
        getWeather(pareCords.latitude, pareCords.longitude);
    }
}

function init() {
    loadCords();
}

init();
