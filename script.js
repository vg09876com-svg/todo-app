const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        const taskElement = document.createElement("li");

        taskElement.classList.add("task");

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-button">Delete</button>
        `;

        taskList.appendChild(taskElement);

        taskElement.querySelector("span").addEventListener("click", function () {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();

        });

        taskElement.querySelector(".delete-button").addEventListener("click", function () {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();

        });

    });
}

addButton.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    displayTasks();

    taskInput.value = "";

});

displayTasks();

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addButton.click();
    }

});