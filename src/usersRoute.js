const express = require("express");
const router =  express.Router();
const db = require('./mongo-connection.js');

db.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

// POST Add user
router.post("/:username", express.json(), function(req, res){
    const dbConnect = db.getDb();
    var myobj = { ['username']: req.params.threadId};
    dbConnect.collection("users").insertOne(myobj, function(err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        res.status(201).send(result);
    });
})

module.exports = router;