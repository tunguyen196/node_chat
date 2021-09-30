const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../Models/User");

const {
  mutilpleMongooseObject,
  mongooseObject,
} = require("../../../util/mongoose"); //format to object

class AuthController {
  index(req, res) {
    return res.render("auth/login");
  }

  async register(req, res, next) {
    // Our register logic starts here
    try {
      // Get user input
      const { name, email, password } = req.body;

      // Validate user input
      if (!(email && password && name)) {
        res.status(400).send("All input is required");
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      //Encrypt user password

      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      //user
      return res
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
        })
        .cookie("user", user)
        .redirect(301, "/messages");
      // return new user
      // res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }

  async login(req, res) {
    // Our login logic starts here
    try {
      // Get user input
      const { login_email: email, login_password: password } = req.body;
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }

      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        // save user token
        user.token = token;

        // user
        return res
          .cookie("access_token", token, {
            expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
          })
          .cookie("user", user)
          .redirect(301, "/messages");
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  }
  async logout(req, res) {
    res.clearCookie("access_token");
    res.clearCookie("user");

    return res.redirect("/auth/login");
  }
}

module.exports = new AuthController();
