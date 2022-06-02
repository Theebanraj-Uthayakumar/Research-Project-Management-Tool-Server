const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  idNumber: {
    type: String,
    require: true,
  },
  faculty: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  researchInterest: {
    type: String,
  },
  type: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
});

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
