const router = require("express").Router();
let Supervisor = require("./../../models/adminModels/Supervisor.js");

router.route("/supRegister").post(async (req, res) => {
  const supervisorId = req.body.supervisorId;
  const name = req.body.name;
  const faculty = req.body.faculty;
  const department = req.body.department;
  const researchField = req.body.researchField;

  const newSupervisor = new Supervisor({
    supervisorId,
    name,
    faculty,
    department,
    researchField,
  });

  newSupervisor
    .save()
    .then(() => {
      res.json("Supervisor Registered");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all registered supervisors
router.route("/").get(async (req, res) => {
  Supervisor.find()
    .then((supervisors) => {
      res.json(Supervisor);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update supervisor details
router.route("/update/:id").put(async (req, res) => {
  let supervisorId = request.params.id;

  const { name, faculty, department, researchField } = req.body;

  const updateSupervisor = {
    name,
    faculty,
    department,
    researchField,
  };

  const update = await Supervisor.findByIdAndUpdate(
    supervisorId,
    updateSupervisor
  )
    .then(() => {
      res.status(200).send({ status: "Supervisor Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error while updating topic" });
    });
});

module.exports = router;
