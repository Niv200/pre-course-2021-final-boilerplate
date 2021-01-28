let tasks = [];
let tickedTasks = [];
let tasksLeft = 0;
let tasksCompleted = 0;
let counterHeader = document.getElementById("tasks-left");
let completedHeader = document.getElementById("completed-tasks");
let resetButton = document.getElementById("reset");
let button = document.getElementById("add-button");

resetButton.addEventListener("click", (e) => {
  resetTotalDone();
  //   for(task of tickedTasks){
  //       let div = document.createElement("div");
  //       div.removeChild(input);
  //       div.removeChild(label);
  //       div.removeChild(removeButton);
  //   }
  let tickedTasks = document.querySelectorAll(".ticked");
  console.log(tickedTasks);
  for (i = 0; i < tickedTasks.length; i++) {
    tickedTasks[i].closest("div").remove();
  }
});

button.addEventListener("click", (e) => {
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");
  let label = document.createElement("label");
  let priorityInput = document.getElementById("priority-selector").value;
  addToTasks(taskDiv, label, task, new Date(), priorityInput);
});

//My functions.
function removeTask(div, label, removeButton) {
  if (!containsTicked(label)) {
    // changeTotalLeft(false);
  }
  div.removeChild(label);
  div.removeChild(removeButton);
}

//Function to return a task object.
function getTaskAsObject(text, priority, date) {
  return {
    text: text,
    priority: priority,
    date: date.now,
  };
}

//Function to reset all inputs after the user hits "add".
function resetInputs() {
  document.getElementsByTagName("input")[0].value = "";
  document.getElementsByTagName("select")[0].value = "";
}

//Function to get the time into a readable format without seconds and miliseconds.
function calculateTime(time) {
  let year = time.getFullYear();
  let month = time.getMonth();
  month = month + 1;
  let day = time.getDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let string = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
  return string;
}

//Function to return text, date, and priority as a single string.
function getTaskText(text, date, priority) {
  return " " + priority + " " + text + " " + calculateTime(date) + " ";
}

//A function to return a color respectively to priority value (1 to 5).
function findPriority(priority) {
  let priorityClassName = "";
  switch (JSON.parse(priority)) {
    case 1:
      priorityClassName = "very-low";
      break;
    case 2:
      priorityClassName = "low";
      break;
    case 3:
      priorityClassName = "normal";
      break;
    case 4:
      priorityClassName = "high";
      break;
    case 5:
      priorityClassName = "very-high";
      break;
  }
  return priorityClassName;
}

//function to change the total tasks left counter, if flag then add 1, if !flag subtract 1.
function changeTotalLeft(flag) {
  let text = counterHeader.innerText;
  if (flag) {
    text = text.replace(tasksLeft, tasksLeft + 1);
    tasksLeft = tasksLeft + 1;
  } else {
    text = text.replace(tasksLeft, tasksLeft - 1);
    tasksLeft = tasksLeft - 1;
  }
  counterHeader.innerText = text;
}

//function to change the numbers of both counters once a task has been ticked.
function changeNumbers(label) {
  if (containsTicked(label)) {
    changeTotalLeft(true);
    label.classList.remove("ticked");
    changeTotalDone(false);
  } else {
    changeTotalLeft(false);
    label.classList.add("ticked");
    changeTotalDone(true);
  }
}

function containsTicked(label) {
  for (className of label.classList) {
    if (className === "ticked") {
      return true;
    }
  }
  return false;
}
//function to change the total tasks done counter, if flag then add 1, if !flag subtract 1.
function changeTotalDone(flag) {
  let text = completedHeader.innerText;
  if (flag) {
    text = text.replace(tasksCompleted, tasksCompleted + 1);
    tasksCompleted = tasksCompleted + 1;
  } else {
    text = text.replace(tasksCompleted, tasksCompleted - 1);
    tasksCompleted = tasksCompleted - 1;
  }
  completedHeader.innerText = text;
}

//A function to reset the total done counter
function resetTotalDone() {
  let text = completedHeader.innerText;
  text = text.replace(tasksCompleted, 0);
  tasksCompleted = 0;
  completedHeader.innerText = text;
}

function addToTasks(taskDiv, label, text, date, priority) {
  let bool = false;
  let task = text;
  //   let input = document.createElement("input");
  //   input.type = "checkbox";
  //   input.id = "item";
  //   input.addEventListener("click", (e) => {
  //     changeNumbers(e.target, label);
  //   });
  //   label.setAttribute("for", input.id);
  if (task.length <= 1) {
    alert("You need to add a task!");
  } else {
    //Find importance number
    if (priority >= 1 && priority <= 5) {
      resetInputs();
      task = getTaskText(text, date, priority);
      label.innerText = task;
      label.className = findPriority(priority);
      console.log(findPriority(priority));
      console.log(priority);
      let div = document.createElement("div");
      //remove button for task
      let removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.innerText = "remove";
      //Deactivation button for tasks
      //   div.appendChild(input);
      div.appendChild(label);
      div.appendChild(removeButton);
      taskDiv.appendChild(div);
      div.className = "test";

      label.addEventListener("click", (e) => {
        changeNumbers(label);
      });
      bool = true;
      changeTotalLeft(true);
      removeButton.addEventListener("click", (e) => {
        if (!containsTicked(label)) {
          changeTotalDone(true);
          changeTotalLeft(false);
        }
        removeTask(div, label, removeButton);
      });
      //   if (todoItemsCount === 1) {
      //     document.getElementById("empty-list-span").style.display = "none";
      //   }
    } else {
      //If importance number is NOT chosen.
      alert("You need to choose importance level!");
    }
  }
  return bool;
}
