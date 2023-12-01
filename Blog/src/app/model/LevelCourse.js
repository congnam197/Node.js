const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Level = new Schema({
  level: { type: String, required: true },
});

module.exports = mongoose.model("level", Level);
