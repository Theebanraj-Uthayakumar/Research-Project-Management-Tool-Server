const router = require("express").Router();
const multer = require("multer");
let Template = require("./../../models/adminModels/Templates");

const cloudinary = require("../../utils/cloudinary");

const upload = require("../../utils/multer");
const { raw } = require("body-parser");

//file upload -- local

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "../frontend/public/uploads/templates");
//   },
//   filename: (req, file, callback) => {
//     callback(null, uuidv4() + "-" + file.originalname);
//   },
// });

// const templateUpload = multer({ storage: storage });

router
  .route("/add")
  .post(upload.single("templateDocument"), async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "rpmt/templates",
      });

      const type = req.body.type;
      const title = req.body.title;
      const description = req.body.description;
      const postedDate = req.body.postedDate;
      const templateDocument = result.url;
      const cloudinaryID = result.public_id;

      //create instance
      const newTemplate = new Template({
        type,
        title,
        description,
        postedDate,
        templateDocument,
        cloudinaryID,
      });

      //save
      await newTemplate.save();
      res.json(newTemplate);
    } catch (error) {
      console.log(error);
    }
  });

//get all templates
router.route("/").get((req, res) => {
  Template.find()
    .then((template) => {
      res.json(template);
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete a template
router.route("/delete/:id").delete(async (req, res) => {
  try {
    let templateID = req.params.id;

    let template = await Template.findById(req.params.id);

    const val = await cloudinary.uploader.destroy(template.cloudinaryID, {
      resource_type: "raw",
      folder: "rpmt/templates",
    });

    console.log(val);

    await Template.findByIdAndDelete(templateID);
    res.status(200).send({ status: "Template Deleted!!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error while deleting the record!!" });
  }
});

//get one template
router.route("/get/:id").get(async (req, res) => {
  let id = req.params.id;

  const template = await Template.findById(id)
    .then((template) => {
      res.status(200).send({ status: "Template Details", template });
    })
    .catch((err) => {
      console.log(err.messege);
      res
        .status(500)
        .send({ status: "Error while getting template", error: err.messege });
    });
});

//update template
router
  .route("/update/:id")
  .put(upload.single("templateDocument"), async (req, res) => {
    try {
      let oldTemplate = await Template.findById(req.params.id);

      await cloudinary.uploader.destroy(oldTemplate.cloudinaryID, {
        resource_type: "raw",
        folder: "rpmt/templates",
      });
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
        folder: "rpmt/templates",
      });
      let templateID = req.params.id;

      const id = req.body.id;
      const title = req.body.title;
      const type = req.body.type;
      const description = req.body.description;
      const postedDate = req.body.postedDate;
      const templateDocument = result.secure_url;
      const cloudinaryID = result.public_id;

      const updateTemplate = {
        id,
        type,
        title,
        description,
        postedDate,
        templateDocument,
        cloudinaryID,
      };
      const update = await Template.findByIdAndUpdate(
        templateID,
        updateTemplate
      );
      res.status(200).send({ status: "Template Details Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Error while updating Data" });
    }
  });

module.exports = router;
