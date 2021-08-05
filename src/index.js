const fetch = require('node-fetch');
const  dotenv = require("dotenv").config();
const yargs = require("yargs");
const readlineSync = require("readline-sync");


const TOKEN = process.env.TOKEN;
const URL = 'https://api.todoist.com/rest/v1/'

function getProjects(){
    fetch(URL + "projects",{
        headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
    })
      .then((res) => res.json())
      .then((data) => console.table(data))
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
    })
    .then(res => res.json())
    .then(data => console.table(data , dataTable))
    .catch(err => {
        console.log("Error" , err)
    })
}

function createTask(){

    let tasktoAdd = {};
    tasktoAdd.content = readlineSync.question("Content : ");
    tasktoAdd.due_string = readlineSync.question("Time : ");
    tasktoAdd.description = readlineSync.question("Description : ");
    fetch(URL + "tasks", {
        method:'POST',
        body : JSON.stringify(tasktoAdd),
        headers : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`
        }
    }).then(console.log("Task Added"))
      .catch(err => {
        console.log("Error" , err)
    })
}

function closeTask(){
    let chooseID  = readlineSync.question("Add the id to delete the task : ");
    fetch(URL + "tasks/" + chooseID+ "/close",{
        method:'POST',
        headers:{
            Authorization: `Bearer ${TOKEN}`
        }
    }).then(console.log("Closed Task"))
      .catch(err => {
        console.log("Error" , err)
    })
    
}

function deleteTask(){
    let chooseID  = readlineSync.question("Add the id to delete the task : ")
    fetch(URL + "tasks/" + chooseID,{
        method:'DELETE',
        headers:{
            Authorization: `Bearer ${TOKEN}`
        }
    }).then(console.log("Deleted Task"))
    .catch(err => {
        console.log("Error" , err)
    })
}

//getActiveTasks()
//createTask()
//closeTask(5046332618)
//deleteTask();

const argv = yargs
    .command('ls' , 'Fetch all the task available')
    .command('add', 'Create/Add a task')
    .command('cl' , 'Close the task')
    .command('dl' , 'Delete the task')
    .argv

    if(argv._[0] === 'ls'){
        return getActiveTasks();
    }
    else if(argv._[0] === 'add'){
        return createTask();
    }
    else if(argv._[0] === 'cl'){
        return closeTask();
    }
    else if(argv._[0] === 'dl'){
        return deleteTask();
    }
    else{
        console.log("Bad input")
    }
