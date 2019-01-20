const express = require("express");
const router = express.Router();
const airlineController = require('../controllers/airlineController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers')

// Home
router.get("/", airlineController.viewHome);

// Login
router.get("/login", airlineController.viewLogin);

// Register
router.get("/register", airlineController.viewRegister);

// Dashboard
router.get("/dashboard", airlineController.viewDashboard);

module.exports = router;
