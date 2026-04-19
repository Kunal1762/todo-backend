const tasklist=document.querySelector("#list");
const completedlist=document.querySelector("#completed-list")
function renderTask(task){
    const text=task.text;
    const ni=document.createElement("li");
    ni.classList.add("task")
    ni.setAttribute("data-id",task.id);
    const desc=document.createElement("span");
    const completedbtn=document.createElement("button");
    const deletbtn=document.createElement("button");

    desc.textContent=text;
    completedbtn.textContent="Completed";
    completedbtn.addEventListener("click",finishTask);
    deletbtn.textContent="Delete";
    deletbtn.addEventListener("click",removetask);
    ni.appendChild(desc);
    ni.appendChild(completedbtn);
    ni.appendChild(deletbtn);
    
    tasklist.append(ni);
    document.querySelector("#input-text").value="";

}
function render(task){
    const text=task.text;
    const ni=document.createElement('li');
    ni.classList.add("task");
    const desc=document.createElement('span');
    desc.textContent=text;
    ni.appendChild(desc);
    completedlist.append(ni);
}
async function addTask(){
    const text=document.querySelector("#input-text").value;
    if(text===""){
        return;
    }
    const response=await fetch('/addtask',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({text})
    })
    const task=await response.json();
    renderTask(task);
    
}
async function removetask(){
    const ni=this.parentElement;

    const id=ni.getAttribute("data-id");
    const response=await fetch(`/remove/${id}`,{
        method:"DELETE"
    });
    const removedTask=await response.json();
    // alert(`${removedTask.text} was removed`);
    ni.remove();

    
}
async function finishTask(){
    const ni=this.parentElement;

    const id=ni.getAttribute("data-id");
    const response=await fetch(`/complete/${id}`,{
        method:"PUT"
    });
    const completedTask=await response.json();
    ni.remove();
    
}
async function loadtasks(){
    const response=await fetch('/list');
    const tasks= await response.json();
    tasks.forEach(task => {
        renderTask(task);
    });
}
async function loadcompleted(){
    const response=await fetch('/getcompleted');
    const tasks=await response.json();
    tasks.forEach(task=>{
        render(task);
    });
}
loadcompleted();
loadtasks();
const addbtn=document.querySelector("#add-button");

addbtn.addEventListener("click",addTask);