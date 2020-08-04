//querySelectorAll은 모든 엘리먼트를 가져와서 array[] 형태로 만들어버림
const form = document.querySelector(".js-form"),
    // 클래스 타입이 아닌 태그타입으로도 소환 가능
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

// 추후 크롬 application의 ★key값
const USER_LS = "currentUser",
    // showing 클래스에 반응할 수 있게 (css에서 클래스 shwoing 반응 코딩)
    SHOWING_CN = "showing";

function saveName(text) {
    // local storage 내 USER_LS라는 키의 value값에 text 저장
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    // 기본 이벤트 동작 금지
    event.preventDefault();
    // input value값 const
    const currentValue = input.value;
    // input에 넣은 값을 파라미터로 하여 paintGreeting 함수 호출
    paintGreeting(currentValue);
    // USER_LS의 value값에 currentValue 저장
    saveName(currentValue);
}

function askForName() {
    // form 상자가 나타나도록 클래스 s추가
    // css 에서 display: block; 처리
    form.classList.add(SHOWING_CN);
    // form에서 submit 이벤트가 발생되면 handleSubmit 함수 호출
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    // form 태그에 showing 클래스를 없애서, css showing이 작동 안하도록
    form.classList.remove(SHOWING_CN);
    // greeting 태그에 showing 클래스를 넣어서, css showing이 작동하도록
    greeting.classList.add(SHOWING_CN);
    // 여기서 argument인 text는 currentUser 변수이며,
    // 이 변수는 localStorage의 USER_LS 키의 value값을 칭함
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    // application에 USER_LS라는 key의 값 가져오기
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        // argument에 들어간 currentUser 변수는 localStorage의 USER_LS 키의 value값
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();
