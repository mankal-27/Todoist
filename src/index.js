const yargs = require("yargs");

const TOKEN = process.env.TOKEN;
const URL = 'https://api.todoist.com/rest/v1/'

const {getProjects, getProjectByID, addTaskUnderProject,closeTaskUnderProject,deleteTaskUnderProject,
      getActiveTasks,createTask,closeTask,deleteTask} = require('./task');

const cmdControllerMapping = {
    ls : getActiveTasks,
    add : createTask,
    close : closeTask,
    delete : deleteTask,
    'lsproj' : getProjects,
    'idproj' : getProjectByID,
    'tsproj' : addTaskUnderProject,
    'clproj' : closeTaskUnderProject,
    'dlproj' : deleteTaskUnderProject,
}
const argv = yargs
    .command('ls' , 'Fetch all the task available')
    .command('add', 'Create/Add a task')
    .command('close' , 'Close the task')
    .command('delete' , 'Delete the task')
    .command('lsproj', 'Fetch all the project available')
    .command('idproj', 'Fetch a project by id')
    .command('tsproj', 'Add Task under Project')
    .command('clproj', 'Close Task under Project')
    .command('dlproj' , 'Delete Task under Project')
    .argv;

if(argv._[0] in cmdControllerMapping){
    cmdControllerMapping[argv._[0]]();
}else{
    console.log("Bad Input");
}

