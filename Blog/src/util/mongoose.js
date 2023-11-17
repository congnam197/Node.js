module.exports = {
  multipleMongooseToObject: function (mongooses) {
    return mongooses.map((mongoose) => mongoose);
  },
  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose : mongoose;
  },
};
