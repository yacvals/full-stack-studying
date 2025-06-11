import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let postArray = [];

app.get("/", (req, res)=>{
    res.render("home.ejs");
    
})



app.post("/post", (req, res)=>{
    let currentdate = new Date(); 
    postArray.push(req.body.text);
    res.render("home.ejs",{
        postArray: postArray
    })
})

app.listen(port,()=>{
    console.log("Server work on port " + port)
})