const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RejectedTopicSchema = new Schema({
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

const rejectedTopics = mongoose.model("RejectedTopics", RejectedTopicSchema);
module.exports = rejectedTopics;
