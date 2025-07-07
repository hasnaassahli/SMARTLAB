import express from 'express';
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser); // route admin
router.post("/login", loginUser);       // route publique

export default router;