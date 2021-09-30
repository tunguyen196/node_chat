const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.access_token;
  if (!token) {
    // return res.status(403).send("A token is required for authentication");
    res.redirect('/auth/login')
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    res.locals._user = {
      auth: true,
      name: req.cookies.user.name,
      _id: req.cookies.user._id,
      email: req.cookies.user.email,
    };
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
