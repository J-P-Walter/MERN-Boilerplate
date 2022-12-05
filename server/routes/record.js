const express = require("express");
const router = express.Router();
const connectDB = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//Basic CRUD
//All files
router.route("/file").get((req, res) => {
  let db_route = connectDB.getDb();
  db_route
    .collection("inspections") //TODO: Replace with collection name
    .find({})
    .limit(10)
    .toArray((err, result) => {
      if (err) throw err;
      console.log("Found");
      res.json(result);
    });
});

//Get record by id
router.route("/file/:id").get((req, res) => {
  let db_route = connectDB.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  //TODO: Replace with collection name
  db_route.collection("inspections").findOne(myquery, (err, result) => {
    if (err) throw err;
    console.log("Found (id)");
    res.json(result);
  });
});

//Create and add record
router.route("/file/add").post((req, response) => {
  let db_route = connectDB.getDb();
  let new_record = {
    //TODO: Replace with params
    param: req.body.text,
  };
  //TODO: Replace with collection name
  db_route.collection("inspections").insertOne(new_record, (err, res) => {
    if (err) throw err;
    console.log("Added");
    response.json(res);
  });
});

//Update record by id
router.route("/update/:id").post((req, response) => {
  let db_route = connectDB.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let new_record = {
    //TODO: Replace with params
    param: req.body.text,
  };
  db_route
    .collection("inspections") //TODO: Replace with collection name
    .replaceOne(myquery, new_record, (err, res) => {
      if (err) throw err;
      console.log("Updated");
      response.json(res);
    });
});

//Delete by id
router.route("/file/:id").delete((req, response) => {
  let db_route = connectDB.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_route.collection("inspections").deleteOne(myquery, (err, obj) => {
    //TODO: Replace with collection name
    if (err) throw err;
    console.log("Deleted");
    response.json(obj);
  });
});

module.exports = router;
