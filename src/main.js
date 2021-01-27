totalItemsCount = 0;
todoItemsCount = 0;
doneItemsCount = 0;
let tasksDone = [];
let tasksLeft = [];
function addTask() {
  /**
 * 
 *      <select id="priority-selector" name="number">
        <option disabled selected value>importance</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>} event 
 */
  let task = document.getElementsByTagName("input")[0].value;
  let taskDiv = document.getElementById("tasks-container");

  let input = document.createElement("input");
  input.type = "checkbox";
  input.id = "item" + totalItemsCount;
  input.onclick = taskChecked;

  //Find importance number
  let priorityInput = document.getElementById("priority-selector").value;
  if (priorityInput >= 1 && priorityInput <= 5) {
    let label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.innerText = task;

    let div = document.createElement("div");

    div.appendChild(input);
    div.appendChild(label);

    taskDiv.appendChild(div);

    document.getElementsByTagName("input")[0].value = "";
    totalItemsCount++;
    todoItemsCount++;
    if (todoItemsCount === 1) {
      document.getElementById("empty-list-span").style.display = "none";
    }
    ////

    console.log(getTaskAsObject(task, priorityInput, new Date()));

    ////
  } else {
    //If importance number is NOT chosen.
    alert("You need to choose importance level!");
  }
}

function taskChecked(event) {
  let div = event.target.parentNode;
  let taskDiv = document.getElementById("tasks-container");
  let taskDoneDiv = document.getElementById("tasks-done-container");

  if (!event.target.checked) {
    taskDiv.appendChild(div);
    taskDoneDiv.removeChild(div);
    todoItemsCount++;
    doneItemsCount--;
  } else {
    taskDiv.removeChild(div);
    taskDoneDiv.appendChild(div);
    todoItemsCount--;
    doneItemsCount++;
  }
  if (todoItemsCount >= 1) {
    document.getElementById("empty-list-span").style.display = "none";
  } else if (todoItemsCount === 0) {
    document.getElementById("empty-list-span").style.display = "block";
  }
}

function getTaskAsObject(text, priority, date) {
  return {
    text: text,
    priority: priority,
    date: date.now,
  };
}
