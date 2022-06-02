const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

let Login = require("./../../models/adminModels/Login");

//add staff member
router.route("/add").post(async (req, res) => {
  try {
    const userID = req.body.userID;
    const password = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role;

    const newLogin = new Login({
      userID,
      password,
      role,
    });

    newLogin.save().then(() => {
      res.json({ status: "ok", messsage: "Login added" });
      res.status(200);
    });
  } catch (error) {
    console.log(error);
  }
});

//get all  logins
router.route("/login").get((req, res) => {
  Login.find()
    .then((logins) => {
      res.json(logins);
      res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete login member
router.route("/delete/:id").delete(async (req, res) => {
  let id = req.params.id;

  await Login.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send({ status: "Login Deleted", id: id });
    })
    .catch((err) => {
      res.status(500).send({ status: "Error while deleting record!!" });
    });
});

//delete login member
router.route("/deleteByUserID/:userID").delete(async (req, res) => {
  let userID = req.params.userID;

  await Login.remove({ userID: userID })
    .then(() => {
      res.status(200).send({ status: "Login Deleted", userID: userID });
    })
    .catch((err) => {
      res.status(500).send({ status: "Error while deleting record!!" });
    });
});

//login route
router.post("/login", async (req, res) => {
  Login.findOne(
    {
      userID: req.body.userID,
    },
    async function (err, result) {
      if (!result) {
        // Resolve your query here
        return res.json({ status: "no_user", user: false });
      } else {
        console.log(result);

        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          result.password
        );

        if (isPasswordValid) {
          const token = jwt.sign(
            {
              userID: result.userID,
              role: result.role,
            },
            "secret123"
          );
          return res.json({
            status: "ok",
            user: token,
            role: result.role,
            userID: result.userID,
            id: result._id,
          });
        } else {
          return res.json({ status: "invalid_password", user: false });
        }
      }
    }
  );
});

module.exports = router;
