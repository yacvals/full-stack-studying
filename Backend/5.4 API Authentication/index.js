import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "jackbauerAndLesia";
const yourPassword = "+380955919723";
const yourAPIKey = "bca03a0d-ae64-4026-a0c2-ca1bc46ee860";
const yourBearerToken = "70c8f27b-0dd7-4fd9-993e-8f0f96300c69";
const apiURL = "https://secrets-api.appbrewery.com"

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
   try {
    const response = await axios.get(apiURL + "/random");
    let result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    let response = await axios.get(apiURL + "/all?page=2", {
       auth: {
     username: yourUsername, 
     password: yourPassword, 
    },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(404).send(error.message);
    };
  });

app.get("/apiKey", async (req, res) => {

    try {
    let response = await axios.get(apiURL + "/filter?score=5&apiKey=" + yourAPIKey);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(404).send(error.message);
    };
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  try {
    let response = await axios.get(apiURL + "/secrets/5", {
    headers: { 
      Authorization: `Bearer ${yourBearerToken}` 
    },
  });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    res.status(404).send(error.message);
    };
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
