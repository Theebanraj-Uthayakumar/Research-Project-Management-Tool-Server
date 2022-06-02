const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
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

const topicSelect = mongoose.model("TopicSelect", TopicSchema);
module.exports = topicSelect;
