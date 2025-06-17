import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
    try{
        const result = await axios.get(`https://v2.jokeapi.dev/joke/Any`);
        res.render("index.ejs", {
            jokeStart: result.data.setup,
            jokeEnd: result.data.delivery,
        })

    }catch(error){
        console.log(error.message);
        res.status(500);
    }
})

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
})