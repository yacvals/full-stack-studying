import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
let firstName = "";
let lastName = "";
let nameLetter;

function countNameLetter(firstName, lastName){
  nameLetter = firstName.length + lastName.length;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  firstName = req.body["fName"];
  lastName = req.body["lName"];
  countNameLetter(firstName, lastName);
  res.render("index.ejs", {nameL: nameLetter })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
