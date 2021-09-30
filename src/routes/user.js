const express = require("express");
const router = express.Router();
const UserController = require("../app/Controllers/User/UserController")

router.get("/", UserController.index);
router.post("/store", UserController.store);

module.exports = router;