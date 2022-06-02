const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SupervisorSchema = new Schema({
  supervisorId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    type: required,
  },

  faculty: {
    type: String,
    required: true,
  },

  department: {
    type: required,
    required: true,
  },

  researchField: {
    type: String,
    required: true,
  },
});

const supRegister = mongoose.model("Supervisor", SupervisorSchema);
module.exports = supRegister;
