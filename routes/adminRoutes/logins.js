const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Login = require("../../models/AdminModels/Login");

//add staff member
router.post("/add", async (req, res) => {
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

//get all registerd users
router.get("/login", (req, res) => {
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
router.delete("/deleteByUserID/:userID", async (req, res) => {
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

//filter users by role
router.get("/Filter", async (req, res) => {
  try {
    const users = await Login.find({ role: req.query.role });
    res.status(200).json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update users
router.patch("/updateByUserID/:userId", async (req, res) => {
  try {
    const updateUsers = await Login.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          userID: req.body.userID,
          password: await bcrypt.hash(req.body.password, 10),
          role: req.body.role,
        },
      }
    );
    res.json(updateUsers);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
