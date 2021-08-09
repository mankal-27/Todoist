## .env File
- Please go through .envSampleFile for neccessary changes to make this code run on your system.

## Stage 1

Features:

- Display tasks. todoist ls active, todoist ls all, todoist ls closed
- Create a new task. todoist add "Task content".
- Close a task. todoist close <task_number>
- Delete a task. todoist delete <task_number>

## Stage 2

- Display all projects. todoist ls active <project_name>, todoist ls all <project_name>. If <project_name> is not given, it should assume the project is the inbox project. APIs also work in the same manner.Check todoist rest docs
- Create a new task. todoist add "Task content" <project_name>
- Close a task. Same as before
- Delete a task. Same as before.

## Stage 3
- Delete all closed tasks
- Change the due date to tomorrow for all active tasks Procrastination FTW
- Show all active tasks due today
- Show overdue tasks
- Create a subtask for a given task
- Show all upcoming tasks for the next 7 days