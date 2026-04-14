const tasklist=document.querySelector("#list");
function renderTask(task){
    const text=task.text;
    const ni=document.createElement("li");
    ni.classList.add("task")
    const desc=document.createElement("span");
    const completedbtn=document.createElement("button");
    const deletbtn=document.createElement("button");

    desc.textContent=text;
    completedbtn.textContent="Completed";
    deletbtn.textContent="Delete";
    ni.appendChild(desc);
    ni.appendChild(completedbtn);
    ni.appendChild(deletbtn);
    
    tasklist.append(ni);

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
const addbtn=document.querySelector("#add-button");

addbtn.addEventListener("click",addTask);