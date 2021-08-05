const fetch = require('node-fetch');
const dotenv = require("dotenv").config();
const yargs = require("yargs").argv;
const readlineSync = require("readline-sync")

const TOKEN = process.env.TOKEN;
const URL = 'https://api.todoist.com/rest/v1/'

function getProjects(){
    fetch(URL + "projects",{
        headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
    }).then((res) => res.json()
      .then((data) => console.table(data)))
      .catch(err => {
          console.log("Error" , err)
      })
}

function getActiveTasks() {
    let dataTable = ["id" , "project_id","content"]
    fetch( URL+"tasks", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => res.json()
    .then((data) => console.table(data,dataTable)))
    .catch(err => {
        console.log("Error" , err)
    })
}

function createTask(){

    let task = {};
    task.content = readlineSync.question("Content : ");
    task.due_string = readlineSync.question("Time : ");
    task.description = readlineSync.question("Description : ");
    fetch(URL + "tasks", {
        method:'POST',
        body : JSON.stringify(data),
        headers : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`
        }
    }).then(console.log("Task Added"))
      .catch(err => {
        console.log("Error" , err)
    })
}

function closeTask(id){
    fetch(URL + "tasks/" + `${id}` + "close",{
        method:'POST',
        headers:{
            Authorization: `Bearer ${TOKEN}`
        }
    }).then(console.log("Closed Task"))
      .catch(err => {
        console.log("Error" , err)
    })
    
}

function deleteTask(id){
    fetch(URL + "tasks/" + `${id}`,{
        method:'POST',
        headers:{
            Authorization: `Bearer ${TOKEN}`
        }
    }).then(console.log("Deleted Task"))
    .catch(err => {
        console.log("Error" , err)
    })
}

let sendData = {
    "content": "Drinks",
    "due_string": "tomorrow at 2:20",
    "due_lang": "en",
    "priority": 4
}

createTask()
//getActiveTasks()