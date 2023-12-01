const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Tên của bạn là bắt buộc",
      max: 30,
    },
    email: {
      type: String,
      required: "Email của bạn là bắt buộc",
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: "Mật khẩu là bắt buộc",
      max: 20,
    },
    role: {
      type: String,
      required: true,
      default: "0x00",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
