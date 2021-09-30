const mongoose = require("mongoose");

async function connect() {
  try {
    // await mongoose.connect("mongodb://localhost:27017/chat");
    await mongoose.connect("mongodb+srv://tunguyena7:Tu110609%40@cluster0.hthop.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");


    console.log("connected");
  } catch (error) {
    console.log("can't connect");
  }
}

module.exports = { connect };