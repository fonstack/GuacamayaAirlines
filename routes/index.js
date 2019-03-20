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

// Purchase Ticket
router.post("/purchaseTicket", airlineController.saveCustomer, airlineController.purchaseFlightTicket);




// API
router.get('/getCustomers', apiController.getCustomers);
router.get('/getCustomer/:identityC', apiController.getCustomer);
router.get('/getEmptySeats/:flightCode', apiController.getEmptySeatsOfFlight);
router.get('/getAirplaneRoutes/:airplaneId', apiController.getAirplanesRoutes);
router.get('/getTicketsSold', apiController.getTicketsSold);
router.get('/getFlightsOverbooking', apiController.getFlightsOverbooking);
router.get('/getFlightsOverbookingPercentage', apiController.getFlightsOverbookingPercentage);
router.get('/getTotalProfits', apiController.getTotalProfits);
router.get('/getProfitOnInterval/:first/:second', apiController.getProfitOnInterval);
router.get('/getNumberFlights/:month', apiController.getNumberFlightsPerMonth);
router.get('/getDifferentsAirplanes', apiController.getDifferentsAirplanes);
router.get('/getFlightsPerAirplane', apiController.getFlightsPerAirplane);
router.get('/getCantTicketsPerAirport', apiController.getCantTicketsPerAirport);
router.get('/getAverageWeightPerAirplane', apiController.getAverageWeightPerAirplane);
router.get('/getAirplanesPerState', apiController.getAirplanesPerState);
router.get('/getUseOfAirplanes', apiController.getUseOfAirplanes);
router.get('/getPeopleVsAge', apiController.getPeopleVsAge);
router.get('/getPeopleVsNationality', apiController.getPeopleVsNationality);
router.get('/getPeopleVsGender', apiController.getPeopleVsGender);

module.exports = router;