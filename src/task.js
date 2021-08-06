const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
const yargs = require("yargs");
const readlineSync = require("readline-sync");

const TOKEN = process.env.TOKEN;
const URL = "https://api.todoist.com/rest/v1/";

// function for passing id
function chooseID() {
  let chooseID = readlineSync.question("Add id : ");
  return chooseID;
}

function getActiveTasks() {
  let dataTable = ["id", "project_id", "content"];
  fetch(URL + "tasks", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.table(data, dataTable))
    .catch((err) => {
      console.log("Error at fetching task - please check ", err);
    });
}

function createTask(id) {
  let tasktoAdd = {};

  tasktoAdd.project_id = id;
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
  let id = chooseID();
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
  let projectID = chooseID();
  createTask(parseInt(projectID));
}

function closeTaskUnderProject() {
  let projectID = chooseID();
  closeTask(parseInt(projectID));
}

function deleteTaskUnderProject() {
  let projectID = chooseID();
  deleteTask(parseInt(projectID));
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
};
