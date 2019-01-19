const express = require("express");
const router = express.Router();

// Home
router.get("/", (req, res) => {
  res.render("home", { title: 'home' });
});

// Login
router.get("/login", (req, res) => {
  res.render("login", { title: 'login' });
});

// Register
router.get("/register", (req, res) => {
  res.render("register", { title: 'register' });
});

module.exports = router;
