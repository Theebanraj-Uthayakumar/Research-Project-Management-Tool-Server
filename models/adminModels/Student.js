const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  idNumber: {
    type: String,
    require: true,
  },
  degree: {
    type: String,
    require: true,
  },
  specialization: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    // require: true,
  },
  role: {
    type: String,
    // require: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
