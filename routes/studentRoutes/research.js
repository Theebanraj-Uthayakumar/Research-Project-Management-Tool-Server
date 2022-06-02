const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");

let Research = require("./../../models/studentModels/Research.js");

// add research details
router.route("/add").post(upload.single("document"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "rpmt/research/student",
    });

    console.log(result);

    const name = req.body.name;
    const topic = req.body.topic;
    const groupID = req.body.groupID;
    const faculty = req.body.faculty;
    const document = result.secure_url;
    const cloudinaryID = result.public_id;

    const newResearch = new Research({
      name,
      topic,
      groupID,
      faculty,
      document,
      cloudinaryID,
    });

    newResearch.save().then(() => {
      res.json("Research Added Successfully!!");
    });
  } catch (error) {
    console.log(error);
  }
});

//get all research details
router.route("/").get((req, res) => {
  Research.find()
    .then((research) => {
      res.json(research);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update research details
router.route("/update/:id").put(upload.single("document"), async (req, res) => {
  try {
    let oldResearch = await Research.findById(req.params.id);
    await cloudinary.uploader.destroy(oldResearch.cloudinaryID, {
      resource_type: "raw",
      folder: "rpmt/research/student",
    });
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "rpmt/research/student",
    });

    console.log(result);

    let researchId = req.params.id;

    const { name, topic, groupID, faculty } = req.body;
    const document = result.secure_url;
    const cloudinaryID = result.public_id;

    const updateResearch = {
      name,
      topic,
      groupID,
      faculty,
      document,
      cloudinaryID,
    };

    await Research.findByIdAndUpdate(researchId, updateResearch).then(() => {
      res.status(200).send({ status: "Research Details Updated" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error while updating Data" });
  }
});

//delete research
router.route("/delete/:id").delete(async (req, res) => {
  try {
    let research = await Research.findById(req.params.id);
    await cloudinary.uploader.destroy(research.cloudinaryID, {
      resource_type: "raw",
      folder: "rpmt/research/student",
    });
    await Research.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "Research Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error while deleting Data" });
  }
});

//get one research details by group id
router.route("/getGroup/:id").get((req, res) => {
  let researchId = req.params.id;

  Research.find({ groupID: researchId })
    .then((research) => {
      res.status(200).send({ status: "Research fetched", research });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get research", error: err.message });
    });
});

//get research details by id
router.route("/get/:id").get((req, res) => {
  let researchId = req.params.id;

  Research.findById(researchId)
    .then((research) => {
      res.status(200).send({ status: "Research fetched", research });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get research", error: err.message });
    });
});

//delete all research details
router.route("/deleteAll").delete(async (req, res) => {
  try {
    let research = await Research.find();
    for (let i = 0; i < research.length; i++) {
      await cloudinary.uploader.destroy(research[i].cloudinaryID, {
        resource_type: "raw",
        folder: "rpmt/research/student",
      });
    } //end of for loop
    await Research.deleteMany().then(() => {
      res.status(200).send({ status: "All Research Deleted" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error while deleting Data" });
  }
});

module.exports = router;
