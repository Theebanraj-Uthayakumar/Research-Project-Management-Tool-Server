const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Research-Project-Management-Tool-Server");
});

const TopicRouter = require("./routes/adminRoutes/topics");
const AcceptRouter = require("./routes/adminRoutes/accepted");
const RejectRouter = require("./routes/adminRoutes/rejected");
const StudentRouter = require("./routes/adminRoutes/student");
const StaffRouter = require("./routes/adminRoutes/staff");
const templateRouter = require("./routes/adminRoutes/template");
const LoginRouter = require("./routes/adminRoutes/logins");
const ResearchRouter = require("./routes/studentRoutes/research");
const GroupRouter = require("./routes/studentRoutes/group");

app.use("/rpmt/topics", TopicRouter);
app.use("/rpmt/acceptedTopics", AcceptRouter);
app.use("/rpmt/rejectedTopics", RejectRouter);

app.use("/rpmt/students", StudentRouter);
app.use("/rpmt/staff", StaffRouter);
app.use("/rpmt/templates", templateRouter);
app.use("/rpmt/users", LoginRouter);

app.use("/rpmt/research", ResearchRouter);
app.use("/rpmt/group", GroupRouter);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`mongodb synced and listening on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
