const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create a new user (admin action)
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "Username already exists" });

    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
