const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
const yargs = require("yargs");
const promise = require("fs/promises");
const readlineSync = require("readline-sync");
const { allLimit } = require("async");

const TOKEN = process.env.TOKEN;
const URL = "https://api.todoist.com/rest/v1/";

// function for passing id
function chooseIDForProject() {
  let chooseID = readlineSync.question("Add Id for project : ");
  return chooseID;
}

function chooseIDForTask(){
  let chooseID = readlineSync.question("Add Id for task : ");
  return chooseID;
}

function getActiveTasks() {
  let ids = [];
  let dataTable = ["id", "project_id", "content"];
  
  return fetch(URL + "tasks", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) => { return data })
    .catch((err) => {
      console.log("Error at fetching task - please check ", err);
    });
}



function createTask(proj_id, task_id) {
  let tasktoAdd = {};

  tasktoAdd.project_id = proj_id;
  tasktoAdd.parent_id = task_id;
  tasktoAdd.content = readlineSync.question("Content : ");
  tasktoAdd.due_string = readlineSync.question("Time : ");
  tasktoAdd.description = readlineSync.question("Description : ");

  fetch(URL + "tasks", {
    method: "POST",
    body: JSON.stringify(tasktoAdd),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then(console.log("Task Added"))
    .catch((err) => {
      console.log("Error at creating a task - please check again", err);
    });
}

function closeTask() {
  let chooseID = readlineSync.question("Add the id to delete the task : ");
  fetch(URL + "tasks/" + chooseID + "/close", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then(console.log("Closed Task"))
    .catch((err) => {
      console.log("Error at closing a task - please check again", err);
    });
}

function deleteTask() {
  let chooseID = readlineSync.question("Add the id to delete the task : ");
  fetch(URL + "tasks/" + chooseID, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then(console.log("Deleted Task"))
    .catch((err) => {
      console.log("Error", err);
    });
}

function getProjects() {
  fetch(URL + "projects", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.table(data))
    .catch((err) => {
      console.log("Error", err);
    });
}

function getProjectByID() {
  let id = chooseIDForProject();
  const URL1 = id == "" ? URL + `projects` : URL + `projects/${id}`;
  fetch(URL1, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.table(data))
    .catch((err) => {
      console.log("Bad id :- check your input id again");
    });
}

function addTaskUnderProject() {
  let projectID = chooseIDForProject();
  createTask(parseInt(projectID));
}

function closeTaskUnderProject() {
  let projectID = chooseIDForProject();
  closeTask(parseInt(projectID));
}

function deleteTaskUnderProject() {
  let projectID = chooseIDForProject();
  deleteTask(parseInt(projectID));
}

function addSubTask() {
  let project_id = chooseIDForProject();
  let task_id = chooseIDForTask();
  createTask(parseInt(project_id), parseInt(task_id));
}

function dueTask(){
  let dueDate = readlineSync.question("Enter due date to check for : ")
  fetch(URL + `tasks?filter=${dueDate}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  }).then(res => res.json())
    .then(data => console.table(data));
}

async function getIds(){
    let result1 = await getActiveTasks()
    let idArray = [];
    for(let i = 0 ; i< result1.length ; i++){
      idArray.push(result1[i].id);
    }
    return idArray;
}

async function updateDueDate(){
  let getid = await getIds();
  for(let i = 0 ; i< getid.length ; i++){
  
    fetch(URL + "tasks/" + getid[i], {
      method: "POST",
      body: JSON.stringify({"due_string" : "tomorrow"}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }
}

async function deleteAllTask(){
  let getid = await getIds();
  for(let i = 0 ; i< getid.length ; i++){

    fetch(URL + "tasks/" + getid[i], {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      }
    })
  }
}


module.exports = {
  getProjects,
  getProjectByID,
  addTaskUnderProject,
  closeTaskUnderProject,
  deleteTaskUnderProject,
  getActiveTasks,
  createTask,
  closeTask,
  deleteTask,
  addSubTask,
  dueTask,
  updateDueDate,
  deleteAllTask,
};
