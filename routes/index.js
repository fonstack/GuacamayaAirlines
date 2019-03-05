const express = require("express");
const router = express.Router();
const airlineController = require('../controllers/airlineController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const apiController = require('../controllers/apiController');
const adminController = require('../controllers/adminController');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { catchErrors } = require('../handlers/errorHandlers')


// Home
router.get("/", airlineController.viewHome);
router.post("/searchFlight", airlineController.searchFlights);

// Login
router.get("/login", authController.noNeedLogged, airlineController.viewLogin);
router.post("/login", authController.login, );

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
router.get("/admin/:section", authController.needLogged, adminController.viewAdmin);
router.get("/admin", authController.needLogged, adminController.viewAdminOnly);
router.post("/admin/planningFlights", authController.needLogged, adminController.planningFlights);


router.post("/sendCustomer", (req, res) => {
  res.json(req.body)
});



// API
router.get('/getCustomers', apiController.getCustomers);
router.get('/getCustomer/:identityC', apiController.getCustomer);
router.get('/getEmptySeats/:flightCode', apiController.getEmptySeatsOfFlight);
router.get('/getAirplaneRoutes/:airplaneId', apiController.getAirplanesRoutes);

module.exports = router;