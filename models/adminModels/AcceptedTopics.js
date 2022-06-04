const mongoose = require("mongoose");//Store the details about Accepted Topics

const AcceptedTopicSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  groupId: {
    type: String,
    required: true,
  },

  faculty: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  researchField: {
    type: String,
    required: true,
  },

  topic: {
    type: String,
    required: true,
  },
});

const acceptedTopics = mongoose.model("AcceptedTopics", AcceptedTopicSchema);
module.exports = acceptedTopics;
