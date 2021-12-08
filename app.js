const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express(); 
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html" ); 
})

app.post("/", function(req, res){


    const quary = req.body.cityName
    const apiKey = "f76a0c26f524b8b1e96861b8cb9cd0d0"
    const unit = "imperial"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + quary + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDiscription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imgUrl ="http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather is currently "  + weatherDiscription + "</p>")
        res.write("<h1>The temperature in " + req.body.cityName + " is "  + temp + " degrees Celcius.</h1>")
        res.write(" <img src=" + imgUrl +" > ")
        res.send()
    })    
}) 
})




app.listen(3000, function () {
    console.log("server started on 3000 Port");

})