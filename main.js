
const prompt = require("prompt-sync")();

function lines(line = 0, LineType = ""){
    for(let i = 0; i < line; i++){
        process.stdout.write(LineType);
    }
    console.log("")
}

function space(){
    console.log("")
}

let task = []

function optionsList(){
    const options = [
        {option: 1, list: "Add a task"},
        {option: 2, list: "View all tasks"},
        {option: 3, list: "Remove a task"},
        {option: 4, list: "Exit"}
    ];

    options.forEach(optionlist => {
        console.log(`${optionlist.option}. ${optionlist.list}`);
    })
}

function addTask(){
    let is_running = true
    while(is_running){
        space();
        lines(20, "=")
        console.log("   { Add Task }")
        lines(20, "=")
        let usertask = prompt("Enter Task (b to back): ")

        if (usertask === 'b'.toLowerCase()){
            space();
            todoMain();
        }else if (usertask && usertask.trim() !== ""){
            task.push({
                id: task.length + 1,
                task: usertask.trim(),
                completed: false
            })
            console.log("Task added!")
            space();
            todoMain();
        }else{
            console.log("Invalid input, task not added.")
        }
    }
}


function viewTask(){
    let is_running = true
    while(is_running){
        space();
        lines(20, "=")
        console.log("   { List Task }")
        lines(20, "=")
        if (task.length === 0){
            space();
            console.log("No task Available")
            space();
            todoMain();
        }

        task.forEach(task => {
            console.log(`ID: ${task.id} | Task: ${task.task} | Completed: ${task.completed ? "Yes" : "No"}`)
        })
        lines(20, "-")
        let userAsk = parseInt(prompt("Do you want to complete the task? (1.Yes/2.No): "))
        
        if (!userAsk || isNaN(userAsk) || userAsk <= 0 || userAsk >= 3){
            console.log("Invalid Choice")
        }else if (userAsk === 1){

            let userTaskCompleted = parseInt(prompt("Enter task id to complete the task: "))
            const taskId = task.find(t => t.id === userTaskCompleted);
            if (taskId){
                space();
                taskId.completed = true
                console.log("Task Complited!")
                lines(20, "=")
                console.log("   { List Task }")
                lines(20, "=")
                task.forEach(task => {
                console.log(`ID: ${task.id} | Task: ${task.task} | Completed: ${task.completed ? "Yes" : "No"}`)
                })
                lines(20, "-")
                space();
                todoMain();
            }else{
                console.log("Invalid task ID")
            }

        }else if (userAsk === 2){
            todoMain();
        }
    }
}

function removeTask(){
    let is_running = true
    while(is_running){
        space();
        lines(20, "=")
        console.log("   { Delete Task }")
        lines(20, "=")
        task.forEach(task => {
            console.log(`ID: ${task.id} | Task: ${task.task} | Completed: ${task.completed ? "Yes" : "No"}`)
            })
        lines(20, "-")
        let deletedtask = parseInt(prompt("Enter task id to delete task (0. to back): "))
        const del = task.find(t => t.id === deletedtask)
        
        if (del){
            task.pop()
            console.log("Task Deleted!")
            space();
            viewTask();
        }else if (deletedtask === 0){
            space();
            todoMain();
        }else{
            console.log("Invalid task id!")
            continue
        }
    }
}

function todoMain(){
    let is_running = true

    while(is_running){
        lines(20, "=")
        console.log("Todo List { OPTIONS }")
        lines(20, "=");
        optionsList();
        lines(20, "=");
        let userchoice = parseInt(prompt("Please Choose: "))

        if (!userchoice || isNaN(userchoice) ||userchoice <= 0 || userchoice >= 5){
            console.log("Invalid choice");
            continue
        } else if (userchoice === 1){
            addTask();
            break
        } else if (userchoice === 2){
            viewTask();
            break
        } else if (userchoice === 3){
            removeTask();
            break
        } else if (userchoice === 4){
            console.log("System Closed")
            process.exit();
        }
    }
    
}

todoMain();