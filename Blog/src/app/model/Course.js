const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");
 require("./LevelCourse")

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
    level: {
      type: Schema.Types.ObjectId,
      ref: 'level',
    },
    videoId: { type: String },
  },
  {
    timestamps: true,
  }
);

//Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deleteAt: true,
  overrideMethods: "all",
});

//Accessing a Model
module.exports = mongoose.model("Course", Course);
