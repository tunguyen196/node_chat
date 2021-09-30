module.exports = {
    mutilpleMongooseObject: (mongooses) => {
      return mongooses.map((mongoose) => mongoose.toObject());
    },
    mongooseObject: (mongosee) => {
      return mongosee ? mongosee.toObject() : mongosee;
    },
  };