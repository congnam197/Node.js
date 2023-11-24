const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlackList = new Schema(
  {
    token: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blackList", BlackList);
