const router = require("express").Router();

//import model
let TopicSelect = require("./../../models/adminModels/TopicSelect.js");
//const { get } = require("./student");

router.route("/registerTopic").post(async (req, res) => {
  const studentId = req.body.studentId;
  const name = req.body.name;
  const groupId = req.body.groupId;
  const faculty = req.body.faculty;
  const department = req.body.department;
  const researchField = req.body.researchField;
  const topic = req.body.topic;

  const newTopicSelect = new TopicSelect({
    studentId,
    name,
    groupId,
    faculty,
    department,
    researchField,
    topic,
  });

  newTopicSelect
    .save()
    .then(() => {
      res.json("Topic submitted");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all submitted topics details
router.route("/").get(async (req, res) => {
  TopicSelect.find()
    .then((topics) => {
      res.json(topics);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update topic submit details
router.route("/update/:id").put(async (req, res) => {
  //assign userID
  let userId = req.params.id;

  //assign updating values
  const { name, groupId, faculty, department, researchField, topic } = req.body;

  //create object using updateing fields
  const updateTopicSelect = {
    name,
    groupId,
    faculty,
    department,
    researchField,
    topic,
  };

  const update = await TopicSelect.findByIdAndUpdate(userId, updateTopicSelect)
    .then(() => {
      res.status(200).send({ status: "Topic Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error while updating topic" });
    });
});

//delete Topic
router.route("/delete/:id").delete(async (req, res) => {
  let Id = req.params.id;

  await TopicSelect.findByIdAndDelete(Id)
    .then(() => {
      res.status(200).send({ status: "Topic Deleted" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with delete Topic", error: err.message });
    });
});

module.exports = router;
