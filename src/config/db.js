const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat");

    console.log("connected");
  } catch (error) {
    console.log("can't connect");
  }
}

module.exports = { connect };