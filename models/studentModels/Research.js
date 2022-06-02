const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResearchSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  topic: {
    type: String,
    require: true,
  },
  groupID: {
    type: String,
    require: true,
  },
  faculty: {
    type: String,
    require: true,
  },
  document: {
    type: String,
    required: true,
  },
  cloudinaryID: {
    type: String,
    required: true,
  },
});

const Research = mongoose.model("Research", ResearchSchema);
module.exports = Research;
