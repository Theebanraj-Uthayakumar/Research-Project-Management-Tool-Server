const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    required: true,
  },
  templateDocument: {
    type: String,
    required: true,
  },
  cloudinaryID: {
    type: String,
    required: true,
  },
});

const Template = mongoose.model("Template", TemplateSchema);

module.exports = Template;
