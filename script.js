var container=document.getElementById('list-box');
var listItem = document.getElementsByClassName('list-item');
var addTxt = document.getElementById('addText');
var addBtn = document.getElementById('addBtn');
const tasksCounter = document.getElementById('tasks-counter');
var deleteAllBtn=document.getElementById('deleteAll');
var editBtn = document.getElementsByClassName('editBtn');
var dltBtn = document.getElementsByClassName('dltBtn');
var text = document.getElementsByClassName('text');
var noto = document.getElementById('showNoto');

var taskList = []

// adding a task
function addTask(){
   
    let task = localStorage.getItem('task');
    if(task == null)
    {
         taskList = [];
    }
    else
    {
        taskList = JSON.parse(task);
    }

    let addValue = addTxt.value;
    if(addValue == "")
    {
        return console.error(error);
    }
    taskList.push(addValue);

    localStorage.setItem('task', JSON.stringify(taskList));
    addTxt.value = "";

    showContent();
   
}

// showing all the tasks
function showContent(){

    let task = localStorage.getItem('task');
    if(task == null)
    {
         taskList=[];
    }
    else
    {
        taskList = JSON.parse(task);
    }
    container.innerHTML="";
    
    taskList.forEach((element ,index)=> {
        var items = createTask(element, index);
        container.appendChild(items);
        let hr = document.createElement('hr');
        container.appendChild(hr);
    });
    
    tasksCounter.innerHTML = taskList.length;
}

// create task function
function createTask(task,index){
    var div = document.createElement('div');
    div.setAttribute('class','list-item');

    var checkBox = document.createElement('input');
    checkBox.type = "checkbox";

    var para = document.createElement('p');
    para.setAttribute('class','text');
    para.innerHTML = task;

    var editBtn = document.createElement('button');
    editBtn.setAttribute('class','editBtn');
    editBtn.setAttribute("onclick","editTask("+index+")");
    editBtn.innerHTML = "Edit Task";

    var deleteTask = document.createElement('button');
    deleteTask.setAttribute('class','dltBtn');
    deleteTask.setAttribute("onclick","deleteTask("+index+")");
    deleteTask.innerHTML = "Delete Task";

    div.appendChild(checkBox);
    div.appendChild(para);
    div.appendChild(editBtn);
    div.appendChild(deleteTask);
    return div;
}

addBtn.addEventListener('click', addTask);

// edit task
function editTask(index){
    let saveText=document.getElementById('saveText');
    let saveBtn=document.getElementById('saveBtn');

    let task = localStorage.getItem('task');
    taskList = JSON.parse(task);

    saveText.value = index;
    addTxt.value = taskList[index];

    saveBtn.style.display = "inline-block";
    addBtn.style.display = "none";
}

// save task after edit
function saveTask(){
    let saveIndex = document.getElementById('saveText').value;
    let task = localStorage.getItem('task');
    taskList = JSON.parse(task);
    taskList[saveIndex] = addTxt.value;
    localStorage.setItem('task',JSON.stringify(taskList));
    saveBtn.style.display = "none";
    addBtn.style.display = "inline-block";
    addTxt.value = "";
    showContent(); 
}

document.getElementById('saveBtn').addEventListener('click', saveTask);


// deleting a task
function deleteTask(index){
    let task = localStorage.getItem('task');
    taskList = JSON.parse(task);
    taskList.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(taskList));
    showContent();
}


// deleting all tasks 
deleteAllBtn.addEventListener('click',function(){
    let task = localStorage.getItem('task');
    if(task == null)
    {
        var taskList = [];
    }
    else
    {
        taskList = JSON.parse(task);
        taskList = [];
    }

    localStorage.setItem('task',JSON.stringify(tasks));
    saveBtn.style.display = "none";
    addBtn.style.display = "inline-block";
    showContent();
});


//enter functionalliy
addTxt.addEventListener('keydown', function(e){
    if(event.key === 'Enter')
    {
        addTask()
    }
});


// function checkTodo(taskId){
//     const taskIndex = taskList.findIndex(function(task){
//         return task.id == taskId
//     });
//     taskList[taskIndex].done = !taskList[taskIndex].done;
// }


//handling the check-box
function handlerEvent(e){
    var txt = e.target.parentElement.children[1];

    if(e.target.checked)
    {
        txt.style.textDecoration = "line-through";
        // editBtn.style.textDecoration = "none";
        // dltBtn.style.textDecoration = "none";
    }
    else
    {
        txt.style.textDecoration="none";
    }
    
}

// const taskCounter = taskList.length;

document.addEventListener('click',handlerEvent);

//initialize content
showContent();