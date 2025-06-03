import express from "express";
const app = express();
const port = 3000;

app.listen(port, ()=>{

});

app.get("/", (req,res)=>{
  res.send("<h1>Hi there</h1>");
});

app.get("/contact",(req, res)=>{
  res.send("+380*********");
});

app.get("/about", (req, res)=>{
  res.send("I`m from Poltava");
});



