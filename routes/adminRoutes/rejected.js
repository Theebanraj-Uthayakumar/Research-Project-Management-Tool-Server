const router = require("express").Router();

const { Router } = require("express");
//import model
let RejectedTopics = require("./../../models/adminModels/RejectedTopics.js");

router.route("/add").post(async (req, res) => {
  const studentId = req.body.studentId;
  const name = req.body.name;
  const groupId = req.body.groupId;
  const faculty = req.body.faculty;
  const department = req.body.department;
  const researchField = req.body.researchField;
  const topic = req.body.topic;

  const newRejectedTopics = new RejectedTopics({
    studentId,
    name,
    groupId,
    faculty,
    department,
    researchField,
    topic,
  });

  newRejectedTopics
    .save()
    .then(() => {
      res.json("Topic Rejected");
    })
    .catch((err) => {
      console.log(err);
    });
});
//get all rejected topics
router.route("/").get(async (req, res) => {
  RejectedTopics.find()
    .then((rejected) => {
      res.json(rejected);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
