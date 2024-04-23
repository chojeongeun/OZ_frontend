const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
let todoArr = []; //할일 배열

// 로컬 저장소에 저장하기(setItem) - todoArr의 내용을 문자열 형태로 바꿔서
function saveTodos() {
  const todoString = JSON.stringify(todoArr);
  localStorage.setItem("myTodos", todoString);
}
// 로컬 저장소에서 가져오기(getItem)
function loadTodos() {
  const myTodos = localStorage.getItem("myTodos");
  if (myTodos !== null) {
    todoArr = JSON.parse(myTodos);
    displayTodos();
  }
}
loadTodos();

//할일 삭제하기
function handleTodoDelBtnClick(clickedId) {
  todoArr = todoArr.filter(function (aTodo) {
    return aTodo.todoId !== clickedId;
  });
  displayTodos();
  saveTodos();
}

//할일 수정하기
function handleTodoItemClick(clickedId) {
  todoArr = todoArr.map(function (aTodo) {
    if (aTodo.todoId === clickedId) {
      return {
        ...aTodo,
        todoDone: !aTodo.todoDone,
      };
    } else {
      return aTodo;
    }
  });
  displayTodos();
}

//할일 보여주기
function displayTodos() {
  todoList.innerHTML = "";

  todoArr.forEach(function (aTodo) {
    const todoItem = document.createElement("li");
    const todoDelBtn = document.createElement("span");
    todoDelBtn.textContent = "Del";
    todoItem.textContent = aTodo.todoText;
    todoItem.title = "클릭하면 완료됩니다";

    if (aTodo.todoDone) {
      todoItem.classList.add("done");
    } else {
      todoItem.classList.add("yet");
    }
    todoDelBtn.title = "클릭하면 삭제됩니다.";
    todoItem.addEventListener("click", function () {
      handleTodoItemClick(aTodo.todoId);
    });

    todoDelBtn.addEventListener("click", () => {
      handleTodoDelBtnClick(aTodo.todoId);
    });
    todoItem.appendChild(todoDelBtn);
    todoList.appendChild(todoItem);
  });
}

//할일 추가하기
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); //새로고침 기존 기능 차단

  //할일 데이터
  const toBeAdded = {
    todoText: todoForm.todo.value,
    todoId: new Date().getTime(), //시간을 식별값으로 사용
    todoDone: false,
  };

  todoForm.todo.value = "";
  todoArr.push(toBeAdded);
  displayTodos();
  saveTodos();
});
