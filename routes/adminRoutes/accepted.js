const router = require("express").Router();

const { Router } = require("express");
//import model
let AcceptedTopics = require("./../../models/adminModels/AcceptedTopics.js");

router.route("/add").post(async (req, res) => {
  const studentId = req.body.studentId;
  const name = req.body.name;
  const groupId = req.body.groupId;
  const faculty = req.body.faculty;
  const department = req.body.department;
  const researchField = req.body.researchField;
  const topic = req.body.topic;

  const newAcceptedTopics = new AcceptedTopics({
    studentId,
    name,
    groupId,
    faculty,
    department,
    researchField,
    topic,
  });

  newAcceptedTopics
    .save()
    .then(() => {
      res.json("Topic Submited");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all submitted topics
router.route("/").get((req, res) => {
  AcceptedTopics.find()
    .then((accepted) => {
      res.json(accepted);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
