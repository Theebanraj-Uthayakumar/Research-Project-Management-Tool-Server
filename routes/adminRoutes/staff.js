const router = require("express").Router();

let Staff = require("./../../models/adminModels/Staff");

//add staff member
router.route("/registerStaffMember").post((req, res) => {
  const name = req.body.name;
  const idNumber = req.body.idNumber;
  const faculty = req.body.faculty;
  const department = req.body.department;
  const researchInterest = req.body.researchInterest;
  const type = req.body.type;
  const password = req.body.password;

  const newStaffMember = new Staff({
    name,
    idNumber,
    faculty,
    department,
    researchInterest,
    type,
    password,
  });

  newStaffMember
    .save()
    .then(() => {
      res.json("Staff Member Registration Successfull!!");
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all staff members
router.route("/").get((req, res) => {
  Staff.find()
    .then((staff) => {
      res.json(staff);
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete staff member
router.route("/delete/:id").delete(async (req, res) => {
  let idNumber = req.params.id;

  await Staff.findByIdAndDelete(idNumber)
    .then(() => {
      res.status(200).send({ status: "Student Deleted" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Error while deleting record!!" });
    });
});

//get one staff member
router.route("/get/:id").get(async (req, res) => {
  let id = req.params.id;

  const staff = await Staff.findById(id)
    .then((staff) => {
      res.status(200).send({ status: "Staff Member Details", staff });
    })
    .catch((err) => {
      console.log(err.messege);
      res
        .status(500)
        .send({ status: "Error while getting user", error: err.messege });
    });
});

//update staff member
router.route("/update/:id").put(async (req, res) => {
  let staffMemberID = req.params.id;

  const {
    name,
    idNumber,
    faculty,
    department,
    researchInterest,
    type,
    password,
  } = req.body;

  const updateStaffMember = {
    name,
    idNumber,
    faculty,
    department,
    researchInterest,
    type,
    password,
  };

  const update = await Staff.findByIdAndUpdate(staffMemberID, updateStaffMember)
    .then(() => {
      res.status(200).send({ status: "Staff Member Details Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error while updating Data" });
    });
});

module.exports = router;
