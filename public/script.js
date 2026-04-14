const tasklist=document.querySelector("#list");
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
    deletbtn.textContent="Delete";
    deletbtn.addEventListener("click",removetask);
    ni.appendChild(desc);
    ni.appendChild(completedbtn);
    ni.appendChild(deletbtn);
    
    tasklist.append(ni);
    document.querySelector("#input-text").value="";

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
    ni.remove();
    const response=await fetch(`/remove/${id}`,{
        method:"DELETE"
    });
    const removedTask=await response.json();
    // alert(`${removedTask.text} was removed`);

    
}
async function loadtasks(){
    const response=await fetch('/list');
    const tasks= await response.json();
    tasks.forEach(task => {
        renderTask(task);
    });
}
loadtasks();
const addbtn=document.querySelector("#add-button");

addbtn.addEventListener("click",addTask);