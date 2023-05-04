
const express = require("express");
const bodyParser = require("body-parser");
const https = require("node:https");
require('dotenv').config();
// const { log } = require("node:console");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res)=>{


      let adviceID = Math.floor( Math.random()*240 ) + 1;

      let url = "https://api.adviceslip.com/advice/" + adviceID;


      https.get(url, (response)=>{


            response.on("data", (data)=>{

                  let adviceData = JSON.parse(data);
                  let adviceText = adviceData.slip.advice;

                  res.render("index", {

                        theAdviceID: adviceID, 
                        theAdviceText: adviceText
                  });
            });
      });
});



app.post("/", (req, res)=>{

      res.redirect("/");

});





app.listen(process.env.PORT || 3000, ()=>{

      console.log("Server running on port 3000 ");

});