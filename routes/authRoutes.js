const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Logout route
router.get("/logout");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login",async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (password === user.password) {
      return res.redirect("/habit");
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }

});

module.exports = router;
