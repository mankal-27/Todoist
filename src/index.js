const yargs = require("yargs");

const TOKEN = process.env.TOKEN;
const URL = 'https://api.todoist.com/rest/v1/'

const {getProjects, getActiveTasks,createTask,closeTask,deleteTask} = require('./task');

const cmdControllerMapping = {
    ls : getActiveTasks,
    add : createTask,
    cl : closeTask,
    dl : deleteTask
}
const argv = yargs
    .command('ls' , 'Fetch all the task available')
    .command('add', 'Create/Add a task')
    .command('cl' , 'Close the task')
    .command('dl' , 'Delete the task')
    .argv;

if(argv._[0] in cmdControllerMapping){
    cmdControllerMapping[argv._[0]]();
}else{
    console.log("Bad Input");
}

