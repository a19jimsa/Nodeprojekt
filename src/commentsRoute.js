const express = require("express");
const router =  express.Router();
const db = require('./mongo-connection.js');

db.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

//GET all comments on a specific thread
router.get("/:id", (req, res)=>{
    const dbConnect = db.getDb();
    dbConnect.collection('comments')
    .find({['id']: req.params.id})
    .toArray(function (err, result) {
        if (err) {
            console.log("Something went wrong with DB call", err)
        } else {
            res.status(200).send(result);
        }
  });
})

// POST Add comment on specific thread
router.post("/:id", express.json(), function(req, res){
    const dbConnect = db.getDb();
    var myobj = { ['id']: req.params.id, ['content']:req.body.content,['posted']:req.body.posted, ['user']:req.body.user};
    dbConnect.collection("comments").insertOne(myobj, function(err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        res.status(201).send({msg: result});
    });
})

module.exports = router;