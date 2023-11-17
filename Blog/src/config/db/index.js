const mongodb = require("mongoose");
async function connect() {
  try {
    await mongodb.connect("mongodb://127.0.0.1:27017/f8_education_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect successfully !!! ");
  } catch (error) {
    console.log("connect failure !!!");
  }
}

module.exports = { connect };
