// js-toDoForm 클래스 소환
const toDoForm = document.querySelector(".js-toDoForm"),
    // js-toDoForm 클래스 내 input 태그 소환
    toDoInput = toDoForm.querySelector("input"),
    // js-toDoList 클래스 소환
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

// 저장할 리스트가 많을 수 있으니 array로 생성
// 추가 및 삭제 될때마다 배열은 변동된 배열로 저장되니깐 let으로 선언
let toDos = [];

function deleteToDo(event) {
    // 클릭한 버튼이 어떤 것인지 알 수 있게 타겟설정
    const btn = event.target;
    // 그 타겟된 버튼의 부모주소를 찾고
    const li = btn.parentNode;
    // 해당하는 li를 삭제 (html 상에서)
    toDoList.removeChild(li);

    // array안에 있는 모든 toDos들이 함수를 통하게됨
    // 배열 원소의 값을 걸러내어 조건에 해당하는(true인 값)들로만
    // "새로운 배열을 생성"
    // 여기서의 toDo도 그냥 함수의 인자명일 뿐.
    const cleanToDos = toDos.filter(function (toDo) {
        // 모든 toDos들이 와서 해당하는 li의 id가 아닐 때만 리턴
        // 즉, 해당 버튼 li를 제외하고 배열을 재생성
        // 그렇기에 해당하는 버튼은 삭제되고 남은 버튼들은 그대로 보여짐
        // li.id는 string형태이기에 parseInt를 통해서 숫자 형태로 변환
        return toDo.id !== parseInt(li.id);
    });
    // toDos를 바뀐 새로운 배열로 불러오기
    toDos = cleanToDos;
    // 그리고 한번 더 새롭게 저장
    saveToDos();
}

function saveToDos() {
    // JS는 local storage에 있는 모든 데이터를 string으로 저장
    // 즉, JS의 data를 local storage에 저장할 수 없음 (데이터, boolean 등)
    // 그렇기에 JSON을 통해 object를 string으로 변환
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    // li, button, span id 생성
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");

    // 삭제 버튼에 X 넣기, 클릭 시 deleteToDo함수 호출
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);

    // button 안에 텍스트 넣기
    span.innerText = text;

    // li 하위에 span, butoon 생성
    li.appendChild(span);
    li.appendChild(delBtn);
    // ul 하위(js-toDolist 클래스)에 li 생성
    toDoList.appendChild(li);

    // li.id가 1부터 순차적으로 생성
    // +1을 안해주면 배열과 같이 0부터 순차적으로 생김
    const newId = toDos.length + 1;
    // local storage에 todo를 저장하기 위해 li에도 id생성
    // 나중에 버튼 클릭 등 이벤트 시에 어떤 li에 명력을 실행해야하는지 구분할 수 있어야 함
    li.id = newId;

    // local storage에도 toDos를 저장해야하기 때문에 object로 생성
    const toDoObj = {
        text: text,
        id: newId
    };

    // toDos[] array안에 toDoObj라는 객체형 element를 넣어줌
    toDos.push(toDoObj);
    // local storage에 저장하는 saveToDos 함수 호출
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    // input에 값을 입력하고 enter를 쳤을 때 다시 초기화.
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // loadedToDos에서 가져온 string 타입을 JS object로 변환
        // JSON으로 그냥 가져오면 string 타입
        const parsedToDos = JSON.parse(loadedToDos);
        // forEach : array에 담겨있는 것들 각각에 한번씩 함수를 실행
        // 한개씩 돌면서 무언가 하기 (함수 호출 등)
        // 여기서 toDo 이름은 그냥 인자명
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    // 기본적으로 바로 load함수
    loadToDos();
    // js-toDoForm 클래스를 submit하면 handleSubmit 함수 호출
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
