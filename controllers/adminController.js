const sequelize = require("../config/database");
const Flight = require("../models/Flight");
const moment = require('moment');

exports.viewAdminOnly = (req, res) => {
  // -------- NUMBER OF FLIGHTS PER AIRPLANE ----------
  let flightsPerAirplane = [];
  let mostVisitedAirport = [];
  sequelize.query(`
    SELECT airplaneId, count(code)
    FROM Flights
    GROUP BY airplaneId
    ORDER BY airplaneId ASC
  `, { type: sequelize.QueryTypes.SELECT })
  .then(result =>{
    // res.json(result);
    flightsPerAirplane = result;
    // res.json(flightsPerAirplane);
    sequelize.query(`
      SELECT count(Routes.destiny) as timesVisited, Routes.destiny as airport
      FROM Flights
      INNER JOIN Routes ON Flights.routeId = Routes.id
      INNER JOIN FlightTicket_Flights ON Flights.code = FlightTicket_Flights.flightCode
      GROUP BY destiny  
      ORDER BY count(Routes.destiny) DESC
    `, { type: sequelize.QueryTypes.SELECT })
    .then(result =>{
      mostVisitedAirport = result;
      sequelize.query(`
      SELECT Flights.airplaneId, (SUM(FlightTicket_Flights.cantPacking*23)/count(DISTINCT Flights.code)) as promedio
      FROM Flights
      INNER JOIN FlightTicket_Flights ON Flights.code = FlightTicket_Flights.flightCode
      GROUP BY Flights.airplaneId
      `, { type: sequelize.QueryTypes.SELECT })
      .then(result =>{
        res.json(result);
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
  // res.render("admin", { title: 'adminOnly' });
};

// sequelize.query(`

// `, { type: sequelize.QueryTypes.SELECT })
// .then(result =>{

// })
// .catch(err => console.log(err));

exports.viewAdmin = (req, res) => {
  const section = req.params.section;

  // ------ PLANNINGS ------
  if (section === 'planningFlights') { // Vista Planning -> Flights
    let flights = [];
    let routesVSairplanes = [];
    sequelize.query(`
      SELECT code, date as departDate, date + INTERVAL(Routes.travelTime) HOUR as arrivalDate, state, airplaneId, routeId, Routes.origin as origin, Routes.destiny as destiny
      FROM Flights
      INNER JOIN Routes ON Routes.id = Flights.routeId
    `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      result.forEach(element => {
        flights.push({
          code: element.code,
          departDate: element.departDate,
          arrivalDate: element.arrivalDate,
          state: element.state,
          airplaneId: element.airplaneId,
          routeId: element.routeId,
          origin: element.origin,
          destiny: element.destiny
        });
      });

      return sequelize.query(`
        SELECT DISTINCT(airplaneId) as airplaneId
        FROM Airplane_Routes
        ORDER BY airplaneId ASC
      `, { type: sequelize.QueryTypes.SELECT })
    })
    .then(result => {
      res.render("admin/planningFlights", { title: 'admin', flights, airplanesIds: result });
    })
    .catch(err => console.log(err));
  } else if (section === 'planningCharters') { // Vista Planning -> Charters
    let charters = [];
    sequelize.query(`
      SELECT Charters.id, Charters.date as departDate, date + INTERVAL(Routes.travelTime) HOUR as arrivalDate, Charters.state, Charters.detourId, Charters.providerId, Providers.name, routeId, Routes.origin, Routes.destiny
      FROM Charters
      INNER JOIN Routes ON Routes.id = Charters.routeId
      INNER JOIN Providers ON providerId = Providers.id
    `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      // res.json({pene: 'pene'});
      result.forEach(element => {
          charters.push({
            id: element.id,
            departDate: element.departDate,
            arrivalDate: element.arrivalDate,
            state: element.state,
            detourId: element.detourId,
            providerId: element.providerId,
            providerName: element.name,
            routeId: element.routeId,
            origin: element.origin,
            destiny: element.destiny
          });
      });

      sequelize.query(`
        SELECT DetourManifests.id, Routes.origin, Routes.destiny FROM DetourManifests 
        INNER JOIN Flights ON flightCode = Flights.code
        INNER JOIN Routes ON Flights.routeId = Routes.id
        WHERE DetourManifests.state = 'Approved'
      `, { type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // res.json({pene: 'pene'});
        // res.json(result);
        let detours = [];
        result.forEach(element => {
          detours.push({
            id: element.id,
            origin: element.origin,
            destiny: element.destiny
          });     
          sequelize.query(`
            SELECT id, name, responseTime, pricePerKilometer
            FROM Providers
            ORDER BY id ASC
          `, { type: sequelize.QueryTypes.SELECT })
          .then(result => {
            let providers = [];
            result.forEach(element =>{
              providers.push({
                id: element.id,
                name: element.name,
                responseTime: element.responseTime,
                pricePerKilometer: element.pricePerKilometer
              });
            });
            // res.json({charters, detours, providers});
            res.render("admin/planningCharters", { title: 'admin' , charters, detours, providers});            
          })
          .catch(err => console.log(err));
        });
        // res.json(detourId);
        // res.render("admin/planningCharters", { title: 'admin' , charters, detourId});
      })
      .catch(err => console.log(err));

      
    })
    .catch(err => console.log(err));
  } else if (section === 'planningRoutes') { // Vista Planning -> Routes
    res.render("admin/planningRoutes", { title: 'admin' });
  } else if (section === 'planningAirplanes') { // Vista Planning -> Airplanes
    let airplanes = [];
    sequelize.query(`
      SELECT id, model, state
      FROM Airplanes
    ` ,{ type: sequelize.QueryTypes.SELECT })
    .then(result => {
      result.forEach(element => {
        airplanes.push({
          id: element.id,
          model: element.model,
          state: element.state
        });
      });
      res.render("admin/planningAirplanes", { title: 'admin' , airplanes});
    })
    .catch(err => console.log(err));
  }

  // ------ REPORTS ------
  else if (section === 'reportsFailures') { // Vista Report -> Failures
    res.render("admin/reportsFailures", { title: 'admin' });
  } else if (section === 'reportsMaintenances') { // Vista Report -> Maintenances
    res.render("admin/reportsMaintenances", { title: 'admin' });
  } else if (section === 'reportsDetours') { // Vista Report -> Detours
    res.render("admin/reportsDetours", { title: 'admin' });
  } else if (section === 'reportsCancelations') { // Vista Report -> Cancelations
    res.render("admin/reportsCancelations", { title: 'admin' });
  }

  // ------ SALES ------
  else if (section === 'salesFlightTickets') { // Vista Sales -> Flight Tickets
    res.render("admin/salesFlightTickets", { title: 'admin' });
  } 
  
  // ------ STATISTICS ------
  else if (section === 'statisticsFlightTickets') { // Vista Statistics -> Flight Tickets
    res.render("admin/statisticsFlightTickets", { title: 'admin' });
  }

  else {
    req.flash('error', 'Not Found this route.');
    req.session.save(function () {
      res.redirect('/');
    });
  }
};


// VISTAS ESPECÍFICAS ADMIN
exports.planningFlights = (req, res) => {
  const date = req.body.date;
  const time = req.body.time;
  let dateLacra = `${ date.split('/')[2] }-${ date.split('/')[1] }-${ date.split('/')[0] } ${ time.split(':')[0] }:${ time.split(':')[1] }:00`;
  dateLacra = moment(dateLacra).add(-4, 'hours');

    Flight.create({
      date: dateLacra,
      airplaneId: req.body.airplaneId,
      routeId: req.body.routeNumber
    })
    .then(result => {
      res.json({result});
      req.flash('success', 'You have successfully registered a flight');
      res.redirect('/admin/planningFlights');
    })
    .catch(err => console.log(err));
};