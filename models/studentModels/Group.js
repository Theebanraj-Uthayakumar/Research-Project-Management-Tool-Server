const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const GroupSchema = new Schema({
  leader: {
    type: String,
    required: true,
  },
  member1: {
    type: String,
    required: true,
  },
  member2: {
    type: String,
    required: true,
  },
  member3: {
    type: String,
    required: true,
  },
});

GroupSchema.plugin(AutoIncrement, {
  inc_field: "groupID",
  start_seq: 20243015,
  inc_amount: 148,
});
const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
