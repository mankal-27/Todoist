const yargs = require("yargs");

const TOKEN = process.env.TOKEN;
const URL = 'https://api.todoist.com/rest/v1/'

const {getProjects, getActiveTasks,createTask,closeTask,deleteTask} = require('./task');

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
        return createTask;
    }
    else if(argv._[0] === 'cl'){
        return closeTask;
    }
    else if(argv._[0] === 'dl'){
        return deleteTask;
    }
    else{
        console.log("Bad input")
    }
