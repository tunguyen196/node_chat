const Message = require("../../Models/Message");

const {
    mutilpleMongooseObject,
    mongooseObject,
  } = require("../../../util/mongoose"); //format to object

class UserController {
  async index(req, res) {
    let messages = await Message.find({}).populate('users');

    res.render("users/index", {messages: mutilpleMongooseObject(messages), user: req.cookies.user});
  }

  store(req, res) {
    req.body.created_at = Date();
    const message = new Message(req.body);

    message.save().then((message) => res.status(200).json(message));
  }
}

module.exports = new UserController();
