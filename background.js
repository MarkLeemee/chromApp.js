const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
    // html imgae 삽입.
    // 새로운 object Image 만들기.
    const image = new Image();
    // random은 0~IMG_NUMBER 이기에 +1 
    image.src = `images/${imgNumber+1}.jpg`;
    // img태그에 bgImage 클래스 네임을 추가시켜 css에서 활용
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom() {
    // Math.floor .random (소숫점 제거, 랜덤출력)
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();
