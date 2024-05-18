const inputBox = document.getElementById("input-box");
const dateInput = document.getElementById("date-input"); // New date input
const addButton = document.getElementById("add-button");
const listContainer = document.getElementById("list-container");

addButton.addEventListener("click", addTask);

function addTask() {
    const taskText = inputBox.value.trim();
    const taskDate = dateInput.value;
    if (taskText === '') {
        alert("You must write something");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText + " - Due Date: " + taskDate; // Include date in task text

    const span = document.createElement("span");
    span.textContent = "\u00d7";
    span.className = "close";

    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = '';
    dateInput.value = ''; // Clear date input after adding task
    saveData();

    // Notification
    alert("Task added: " + taskText + " - Due Date: " + taskDate);
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN") {
        const taskText = e.target.parentElement.textContent.split(' - ')[0].trim(); // Extract task text
        e.target.parentElement.remove();
        saveData();
        // Notification
        alert("Task completed: " + taskText);
    }
},false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
