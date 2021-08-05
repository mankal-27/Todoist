const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
const dotenv = require("dotenv").config();
const yargs = require("yargs");

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
    fetch( URL+"tasks", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => res.json()
    .then((data) => console.table(data)))
    .catch(err => {
        console.log("Error" , err)
    })
}

function createTask(contentData, time , description,priority){
    const task = {
        "content" : `${contentData}`,
        "due_string" : `${time}`,
        "description" : `${description}`,
        "priority" : `${priority}`,
    };

    fetch(URL + "tasks", {
        method:'POST',
        body : JSON.stringify(task),
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
    fetch(URL + "tasks" + `${id}` + "close",{
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
    fetch(URL + "tasks" + `${id}`,{
        method:'POST',
        headers:{
            Authorization: `Bearer ${TOKEN}`
        }
    }).then(console.log("Deleted Task"))
    .catch(err => {
        console.log("Error" , err)
    })
}

