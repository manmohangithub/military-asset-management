const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = "secret";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, role: user.role, base: user.base },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
        base: user.base
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

module.exports = router;