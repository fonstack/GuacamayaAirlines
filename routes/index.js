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

// View Airport
router.get("/airport/:iata", airlineController.viewAirport);

// Logout User
router.get("/logout", authController.logout);

// Admin View
router.get("/admin", airlineController.viewAdmin);

// Project
router.get("/project", airlineController.viewOffices);
router.post("/project/create", airlineController.createOffice);
router.post("/project/delete/:id", airlineController.deleteOffice);

module.exports = router;
