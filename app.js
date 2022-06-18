//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "25eaff03e5151f57876b91da27992402";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(response){
    console.log("Status code: " + response.statusCode);

    response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDesc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<h1>Temperature in " + query + " is " + temp + " degrees Celcius</h1>");
    res.write("<p>The weather is currently " + weatherDesc + "</p>");
    res.write("<img src=" + imageURL + ">");
    res.send();
    });
  });

});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
