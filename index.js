const express=require('express');
const app=express();
const PORT=3000;
app.use(express.json());
app.use(express.static("public"));

let todolist=[];
let idcnt=0;

app.post("/addtask",(req,res)=>{

    const {text}=req.body;

    if(!text){
        res.status(404).json({error:"Text is required"});
    }
    const t={
        id:++idcnt,
        text,
       
    }
    todolist.push(t);
    res.json(t);

})
app.get("/list", (req,res)=>{
    res.json(todolist);
})

app.put("/update/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const todo=todolist.find(t=>t.id===id);

    if(!todo){
        return res.status(404).json({error:"Not Found"});
    }
    if(req.body.text!==undefined){
        todo.text=req.body.text;
    }
    if(req.body.completed!==undefined){
        todo.completed=req.body.completed;
    }
    res.json(todo);
})
app.delete("/remove/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=todolist.findIndex(t=>t.id===id);
    let deleted;
    if(index!=-1){
        deleted=todolist.splice(index,1);
    }
    res.json(deleted);
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}.`);
});