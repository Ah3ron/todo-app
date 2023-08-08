const todoForm = document.querySelector(".todo-form");
const todoFormInput = document.querySelector(".todo-form__input");
const todoFormButton = document.querySelector(".todo-form__button");
const todoList = document.querySelector(".todo-list");

function handleFormSubmit(e) {
    e.preventDefault();
}

function loadData() {
    const savedTodoItems = localStorage.getItem("todoItems");
    if (savedTodoItems) {
        todoList.innerHTML = savedTodoItems;
        loadCheckboxStates();
    }
}

function addNewElement() {
    const inputValue = todoFormInput.value.trim();
    if (inputValue === "") {
        return;
    }

    const li = createTodoItem(inputValue);
    todoList.appendChild(li);

    resetFormInput();
    saveData();
}

function createTodoItem(inputValue) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    const capitalizedValue = capitalizeFirstLetter(inputValue);
    const text = createTodoText(capitalizedValue);
    li.appendChild(text);

    const doneButton = createDoneButton();
    li.prepend(doneButton);

    const deleteButton = createDeleteButton();
    li.appendChild(deleteButton);

    return li;
}

function createTodoText(text) {
    const span = document.createElement("span");
    span.classList.add("todo-item__text");
    span.innerHTML = text;
    return span;
}

function createDoneButton() {
    const input = document.createElement("input");
    input.classList.add("todo-item__done");
    input.setAttribute("type", "checkbox");
    return input;
}

function createDeleteButton() {
    const button = document.createElement("button");
    button.classList.add("todo-item__delete");

    const icon = document.createElement("img");
    icon.src = "icons/trash.svg";
    button.appendChild(icon);

    return button;
}

function resetFormInput() {
    todoFormInput.value = "";
}

function capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function handleListClick(e) {
    if (e.target.closest(".todo-item__delete")) {
        const item = e.target.closest(".todo-item");
        item.remove();
    } else if (e.target.closest(".todo-item__done")) {
        const item = e.target.closest(".todo-item");
        item.classList.toggle("todo-item--checked");
    }

    saveData();
}

function saveData() {
    const todoItems = todoList.innerHTML;
    localStorage.setItem("todoItems", todoItems);
}

function loadCheckboxStates() {
    const todoItems = todoList.querySelectorAll(".todo-item");
    todoItems.forEach(item => {
        const doneCheckbox = item.querySelector(".todo-item__done");
        if (item.classList.contains("todo-item--checked")) {
            doneCheckbox.checked = true;
        }
    });
}

todoForm.addEventListener("submit", handleFormSubmit);
todoFormButton.addEventListener("click", addNewElement);
todoList.addEventListener("click", handleListClick);
loadData();