const express=require('express');
const app=express();
const PORT=3000;
app.use(express.json());

let todolist=[];
let idcnt=0;

app.post("/addToDo",(req,res)=>{

    const {text}=req.body;

    if(!text){
        res.status(404).json({error:"Text is required"});
    }
    const t={
        id:++idcnt,
        text,
        completed:false
    }
    todolist.push(t);
    res.json(t);

})
app.get("/list", (req,res)=>{
    res.json(todolist);
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}.`);
});