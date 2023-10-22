/*document.getElementById("tasks").onmousemove = e => {
    for(const task of document.getElementsByClassName("task")) {
      const rect = task.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
  
      task.style.setProperty("--mouse-x", `${x}px`);
      task.style.setProperty("--mouse-y", `${y}px`);
    };
  }*/


//** Modal **
const modal= document.querySelector('#center');
const closeBtn= document.querySelector('#close');
const show= document.querySelector('#btn');

show.addEventListener('click',()=>{
   modal.style.display="block";
});

closeBtn.addEventListener('click',()=>{
   modal.style.display="none"
});
//** //Modal// */



//** clear placeholder */
document.querySelector('#newtask').addEventListener('click',()=>{
document.querySelector('#newtask').setAttribute('placeholder',"");
});
//** */



let tasksinfo =[
    {
        "task" : "go to sleep at 10pm",
        "date" : "15/19/2023",
        "done" : false
    },
    {
        "task" : "finish your project",
        "date" : "2023",
        "done" : false
    }
];




//** Getting data from local storage and parse it from JSON to an array so we can overide the old "tasksinfo" */
let newTaskInfo= JSON.parse(localStorage.getItem('myTasks'))
tasksinfo= newTaskInfo ?? [];
//**/=====================//*/


display();


//**when you add new task */
document.querySelector('#add').addEventListener('click',()=>{
    const newTask=document.querySelector('#newtask').value;
    document.querySelector('#newtask').value="";
    const content={
    "task":newTask,
    "date":giveDate(),
    "done":false
};
if (newTask!=""){
tasksinfo.push(content);
storingTasks();
}
display();
document.querySelector('#newtask').setAttribute('placeholder',"Enter your task here");
});
//**/ when you add new task // */

function giveDate(){
    const d=new Date();
    const now=`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()} | ${d.getHours()}:${d.getMinutes()}`;
    return now;
}

//** display tasks */
function display(){ 
    let i=0;
    document.querySelector('#tasks').innerHTML="";
    for (const mytask of tasksinfo){
        document.querySelector("#tasks").innerHTML+=
        `
        <div class="task">
            <!--! task info -->
            <div class="task-info">
                 <p>${mytask.task}</p>
            <div>
            <i class="bx bx-calendar"></i>
            <span>${mytask.date}</span>
            </div>
            </div>
            <!--!/ task info //-->
            <!--! task actions -->
            <div class="task-action">
                <button onclick="deleteTask(${i})" class="round-btn red"><i class="bx bxs-trash"></i></button>
                <button onclick="isDone(${i})" class="round-btn green"><i class="bx bx-calendar-check"></i></button>
                <button onclick="updateTask(${i})" class="round-btn purple"><i class="bx bxs-edit"></i></button>
            </div>
            <!--!/ task actions //-->
        </div>
        `;
        i=i+1;
        };
    stay();
};
//**/ display tasks //*/


//** Delete a task */
function deleteTask(index){
    if(confirm(`Are you sure you want to delete this task " ${tasksinfo[index].task} " ?`)){
        tasksinfo.splice(index,1);
        storingTasks();
        display();
    };
};
//**/ Delete a task //*/


//** Update a task */
function updateTask(index){
let test= prompt(`You can update this task " ${tasksinfo[index].task} "`,tasksinfo[index].task);
if(test!=null && test!=""){
    if(confirm("Are you sure you want to update this task ?")){
       tasksinfo[index].task=test;
       tasksinfo[index].date=giveDate();
       storingTasks();
       display();
}
}
}
//**/ Update a task //*/


//** Done */
function isDone(index){
    const color= document.querySelectorAll('.task');
    if(tasksinfo[index].done==false){
        color[index].style.background="rgba(9, 255, 0, 0.2)";
        color[index].querySelector('.green').innerHTML="<i class='bx bx-window-close'></i>";
        color[index].querySelector('.green').className="round-btn green before";
        tasksinfo[index].done=true;
        storingTasks();
      }else{
        color[index].style.background="rgba(227, 173, 239, 0.2)";
        color[index].querySelector('.green').innerHTML="<i class='bx bx-calendar-check'></i>";
        color[index].querySelector('.green').className="round-btn green after";
        tasksinfo[index].done=false;
        storingTasks();
      }
}
//**/ Done //*/


//** keeping complete task */ 
function stay(){
    const color= document.querySelectorAll('.task');
    newTaskInfo=newTaskInfo??[];
    for(let task of newTaskInfo){
        const index=newTaskInfo.indexOf(task);
    if(newTaskInfo[index].done==true){
        color[index].style.background="rgba(9, 255, 0, 0.2)";
        color[index].querySelector('.green').innerHTML="<i class='bx bx-window-close'></i>";
        color[index].querySelector('.green').className="round-btn green before";
    }}
}
//**/ keeping complete task //*/


//!=============== LOCAL STORAGE FUNCTIONS ============//
function storingTasks(){
    localStorage.setItem('myTasks',JSON.stringify(tasksinfo));
}

