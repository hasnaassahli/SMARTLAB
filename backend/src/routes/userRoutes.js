const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser); // route admin
router.post("/login", loginUser);       // route publique

module.exports = router;
