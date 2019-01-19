const express = require("express");
const router = express.Router();

// Ruta inicial
router.get("/", (req, res) => {
  res.render("home", { title: 'home' });
});

module.exports = router;
