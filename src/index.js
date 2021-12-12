const { application } = require("express");
const express = require("express");

const app = express();

app.use('/', express.static('src'))
app.use('/components', express.static('components'))

const commentsRoute = require("./commentsRoute")
app.use("/comments", commentsRoute);

const threadRoute = require("./threadRoutes")
app.use("/threads", threadRoute);

//Hämtar ut startup.html när localhost:3000 körs.
app.get('/', function(req, res){
    res.sendFile('/src/index.html',{root: '.'})
    console.log("Start");
})

app.listen(3000, function (){
    console.log("Server started")
})
