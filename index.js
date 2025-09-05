import express from "express";
import path, { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from 'uuid';
import methodOverride from "method-override";
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
const app = express();
const port = 3000;
// middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
// data
let posts=[
    {   
        id:uuidv4(),
        usrname:"yugo.yug",
        content:"winner take is all and losser has to fall."
    },
    {
        id:uuidv4(),
        usrname:"narendermodi",
        content:"I am not going to give you election booth CCTV images."
    },
    {
        id:uuidv4(),
        usrname:"rahulgandhi",
        content:"BJP did vote chori!"
    }
]

app.listen(port,()=>{
    console.log(`Server is listing at ${port}`);
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/posts",(req,res)=>{
   res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
})
app.post("/posts",(req,res)=>{
    let {usrname,content}=req.body;
    let id=uuidv4();
    posts.push({id,usrname,content});
    res.redirect("/posts");
})



app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("post.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let { id }=req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>p.id === id);
    post.content=newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edits",(req,res)=>{
    let { id }=req.params;
    let post = posts.find((p)=>p.id === id);
    res.render("edit.ejs",{post});

})
app.delete("/posts/:id",(req,res)=>{
    let { id }=req.params;
    posts = posts.filter((p)=>p.id !== id);
    res.redirect("/posts");

})