const router = require("express").Router();
let Group = require("../../models/StudentModels/Group");

//adding group details
router.post("/add", async (req, res) => {
  const groupExist = await Group.findOne({
    studentID: req.body.studentID,
  });
  if (groupExist)
    return res.status(400).json({ error_Message: "Group already exists" });

  const newGroup = await new Group(req.body);

  newGroup
    .save()
    .then(() => {
      res.json("Group Added Successfully!!");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all group details
router.get("/", async (req, res) => {
  Group.find()
    .then((group) => {
      res.json(group);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get All group By Student ID
router.get("/FilterGroup", async (req, res) => {
  try {
    const groups = await Group.find({ studentID: req.query.studentID });
    res.status(200).json(groups);
  } catch (err) {
    res.json({ message: err });
  }
});

//update group details
router.route("/update/:id").put(async (req, res) => {
  let groupId = req.params.id;

  const { leader, member1, member2, member3 } = req.body;

  const updateGroup = {
    leader,
    member1,
    member2,
    member3,
  };

  const update = await Group.findByIdAndUpdate(groupId, updateGroup)
    .then(() => {
      res.status(200).send({ status: "Group Details Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error while updating Data" });
    });
});

//delete a group details
router.route("/delete/:id").delete(async (req, res) => {
  let groupId = req.params.id;

  const deleteGroup = await Group.findByIdAndDelete(groupId)
    .then(() => {
      res.status(200).send({ status: "Group Details Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error while deleting Data", error: err.message });
    });
});

//delete all the group details
router.route("/deleteAll").delete(async (req, res) => {
  await Group.deleteMany({})
    .then(() => {
      res.status(200).send({ status: "All Group Details Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error while deleting Data", error: err.message });
    });
});

//get one group details by id
router.route("/get/:id").get(async (req, res) => {
  let groupId = req.params.id;

  const group = await Group.findById(groupId)
    .then((group) => {
      res.status(200).send({ status: "Group Details", group });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error while getting Data", error: err.message });
    });
});

module.exports = router;
