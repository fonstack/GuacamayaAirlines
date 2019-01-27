const express = require("express");
const router = express.Router();
const airlineController = require('../controllers/airlineController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { catchErrors } = require('../handlers/errorHandlers')


// Home
router.get("/", airlineController.viewHome);

// Login
router.get("/login", authController.noNeedLogged, airlineController.viewLogin);
router.post("/login", authController.login);

// Register
router.get("/register", authController.noNeedLogged, airlineController.viewRegister);
router.post("/register", userController.validateRegister, userController.register, authController.login);

// Dashboard
router.get("/dashboard", airlineController.viewDashboard);

// View Airport
router.get("/airport/:iata", airlineController.viewAirport);

// Logout User
router.get("/logout", authController.logout);

// Admin View
router.get("/admin", authController.needLogged, airlineController.viewAdmin);

// Project
router.get("/project", airlineController.viewOffices);
router.post("/project/create", airlineController.createOffice);
router.post("/project/delete/:id", airlineController.deleteOffice);

module.exports = router;
