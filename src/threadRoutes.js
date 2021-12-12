const express = require("express");
const router =  express.Router();
const db = require('./mongo-connection.js');

db.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

//GET all threads
router.get("/", (req, res)=>{
    const dbConnect = db.getDb();
    dbConnect.collection('threads')
    .find({})
    .toArray(function (err, result) {
        if (err) {
            console.log("Something went wrong with DB call", err)
        } else {
            res.status(200).send(result);
        }
  });
})

// POST Add answer on specific comment on a city
router.post("/", express.json(), function(req, res){
    const dbConnect = db.getDb();
    var myobj = { ['id']: req.body.id, ['topic']: req.body.topic, ['category']:req.body.category, ['content']:req.body.content,['posted']:req.body.posted, ['user']:req.body.user};
    dbConnect.collection("threads").insertOne(myobj, function(err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        res.status(201).send(result);
    });
})

module.exports = router;