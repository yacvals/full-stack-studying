import express from "express"
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

let weekendText = "Hey! It`s a weekend, it`s time to have fun!"
let weekDayText = "Hey! It`s a weekday, it`s time to work hard!"

const d = new Date();
let dayNumber = d.getDay();
const __dirname = dirname(fileURLToPath(import.meta.url));
let isWeekEnd = (dayNumber>0|dayNumber<6)?weekDayText:weekendText;
    
app.get("/",(req, res)=>{
    //console.log(isWeekEnd)
res.render(__dirname+"/views/index.ejs", {
    day: isWeekEnd
});

})

app.listen(port, ()=>{
    console.log("Listening on port:"+port)
})