const express = require("express");
const router = express.Router();
const AuthController = require("../app/Controllers/Auth/AuthController")

router.get("/login", AuthController.index);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.post("/register", AuthController.register);

module.exports = router;