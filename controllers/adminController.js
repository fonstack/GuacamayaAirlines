const sequelize = require("../config/database");
const Flight = require("../models/Flight");
const moment = require('moment');
const Charter = require("../models/Charter");
const Airplane = require("../models/Airplane");
const FailureReport = require("../models/FailureReport");
const MaintenanceReport = require("../models/MaintenanceReport");
const CancelationManifest = require("../models/CancelationManifest");
const DetourManifest = require("../models/DetourManifest");

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
        // res.json(result);
        res.render("admin", { title: 'adminOnly' });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
  // res.render("admin", { title: 'adminOnly' });
};

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
        // res.json({penexote: 'escroto'});
        // res.json({pene: 'pene'});
        // res.json(result);
        let detours = [];
        // res.json({penexote: 'escroto'});
        result.forEach(element => {
          detours.push({
            id: element.id,
            origin: element.origin,
            destiny: element.destiny
          });
        });
        
          // res.json({penexote: 'escroto'});     
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
        // res.json(detourId);
        // res.render("admin/planningCharters", { title: 'admin' , charters, detourId});
      })
      .catch(err => console.log(err));

      
    })
    .catch(err => console.log(err));
  } else if (section === 'planningRoutes') { // Vista Planning -> Routes
    let routes = [];
    sequelize.query(`
      SELECT id, origin, destiny, concat(basePrice, ' $') as basePrice, concat(travelDistance, ' Km') as travelDistance, concat(travelTime, ' Hrs') as travelTime FROM Routes
    `, { type: sequelize.QueryTypes.SELECT })
    .then( result => {
      result.forEach(element =>{
        routes.push({
          id: element.id,
          origin: element.origin,
          destiny: element.destiny,
          basePrice: element.basePrice,
          travelDistance: element.travelDistance,
          travelTime: element.travelTime
        });
      });
      res.render("admin/planningRoutes", { title: 'admin' , routes});
    })
    .catch(err => console.log(err));



    // res.render("admin/planningRoutes", { title: 'admin' });
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
      sequelize.query(`
        SELECT model
        FROM AirplaneModels
      `, { type: sequelize.QueryTypes.SELECT })
      .then(result=> {
        // res.json(result);
        res.render("admin/planningAirplanes", { title: 'admin' , airplanes, models: result});
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  // ------ REPORTS ------
  else if (section === 'reportsFailures') { // Vista Report -> Failures
    sequelize.query(`
      SELECT id, airplaneId, date, state
      FROM FailureReports
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      const failures = result;
      sequelize.query(`
        SELECT id
        FROM Airplanes
      `,{ type: sequelize.QueryTypes.SELECT })
      .then(models =>{
        res.render("admin/reportsFailures", { title: 'admin' , failures, models});
      })
      .catch(err => console.log(err));
    })  
    .catch(err => console.log(err));


  } else if (section === 'reportsMaintenances') { // Vista Report -> Maintenances

    sequelize.query(`
      SELECT id
      FROM Airplanes
    `,{ type: sequelize.QueryTypes.SELECT })
      .then(result => {
        const models = result;
        sequelize.query(`
          SELECT id, airplaneId, startDate, endDate
          FROM MaintenanceReports
        `, { type: sequelize.QueryTypes.SELECT})
        .then(mants=>{
          res.render("admin/reportsMaintenances", { title: 'admin' , mants, models });
        })  
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    

  } else if (section === 'reportsDetours') { // Vista Report -> Detours
    sequelize.query(`
      SELECT id, flightCode, newDestination, date, state
      FROM DetourManifests
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      const detours = result;

      sequelize.query(`
        SELECT Flights.code as code, Routes.origin as origin, Routes.destiny as destiny
        FROM Flights
        INNER JOIN Routes ON Flights.routeId = Routes.id
        ORDER BY Flights.code ASC;
      `, { type: sequelize.QueryTypes.SELECT})
        .then(result => {

          res.render("admin/reportsDetours", { title: 'admin' , detours,  flights: result});
        })
        .catch(err => console.log(err));


    })  
    .catch(err => console.log(err));


  } else if (section === 'reportsCancelations') { // Vista Report -> Cancelations

    sequelize.query(`
    SELECT id, flightCode, state, date
    FROM CancelationManifests
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result =>{
      let cans = result;
      sequelize.query(`
      SELECT code
      FROM Flights
      `, { type: sequelize.QueryTypes.SELECT})
      .then(models => {
        res.render("admin/reportsCancelations", { title: 'admin' , cans, models});
      })  
      .catch(err => console.log(err));
    })  
    .catch(err => console.log(err));


  }

  // ------ SALES ------
  else if (section === 'salesFlightTickets') { // Vista Sales -> Flight Tickets

    sequelize.query(`
      SELECT FlightTickets.id, CustomersB.firstName as firstNameBuyer, CustomersB.lastName as lastNameBuyer, CustomersP.firstName as firstNamePassenger, CustomersP.lastName as lastNamePassenger, FlightTickets.salePrice
      FROM FlightTickets
      INNER JOIN Customers as CustomersB ON buyerId = CustomersB.id
      INNER JOIN Customers as CustomersP ON passengerId = CustomersP.id
    `, { type: sequelize.QueryTypes.SELECT})
    .then( tickets => {
      res.render("admin/salesFlightTickets", { title: 'admin' , tickets});
    })
    .catch(err => console.log(err));
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

exports.planningCharters = (req, res) => {
  const date = req.body.date;
  const time = req.body.time;
  const provider = req.body.provider;
  const detour = req.body.detour;
  let dateLacra = `${ date.split('/')[2] }-${ date.split('/')[1] }-${ date.split('/')[0] } ${ time.split(':')[0] }:${ time.split(':')[1] }:00`;
  dateLacra = moment(dateLacra).add(-4, 'hours');
  // res.json({penesito: {dateLacra, provider, detour}});
  sequelize.query(`
    SELECT DetourManifests.id, Routes.id as routeId FROM DetourManifests 
    INNER JOIN Flights ON flightCode = Flights.code
    INNER JOIN Routes ON Flights.routeId = Routes.id
    WHERE DetourManifests.id = ${detour}
  `, { type: sequelize.QueryTypes.SELECT } )
  .then(result =>{
    // res.json({penexote: 'escroto'});
    let route = result.routeId;
    Charter.create({
      date: dateLacra,
      routeId: route,
      providerId: provider,
      detourId: detour
    })
    .then(result => {
      // res.json(result);
      sequelize.query(`
        UPDATE DetourManifests
        SET state = 'done'
        WHERE id = ${detour}
      `, { type: sequelize.QueryTypes.UPDATE })
      .then(result =>{
        // res.json(result);
        req.flash('success', 'You have successfully registered a Charter Flight');
        res.redirect('/admin/planningCharters');
      })
      .catch(err => console.log(err));

    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

};

exports.planningAirplanes = (req, res) => {
  const state = req.body.state;
  const model = req.body.model;

  Airplane.create({
    model: model,
    state: state
  })
  .then(result => {
    req.flash('success', 'You have successfully registered an Airplane');
    res.redirect('/admin/planningAirplanes');
  })
  .catch(err => console.log(err));
};

exports.reportsFailures = (req, res) => {
  const airplaneId = req.body.airplaneId;
  const date = new Date();
  let dateLacra = `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() } ${ date.getHours() }:${ date.getMinutes() }:00`;
  dateLacra = moment(dateLacra).add(-4, 'hours');

  FailureReport.create({
    airplaneId: airplaneId,
    state: 'Pending',
    date: dateLacra
  })
  .then(result => {
    req.flash('success', 'You have successfully registered a Failure');
    res.redirect('/admin/reportsFailures');
  })
  .catch(err => console.log(err));
};

exports.reportsMaintenance = (req, res) => {
  const airplaneId = req.body.airplaneId;
  const date = req.body.date;
  const time = req.body.time;
  
  let dateLacra = `${ date.split('/')[2] }-${ date.split('/')[1] }-${ date.split('/')[0] } ${ time.split(':')[0] }:${ time.split(':')[1] }:00`;
  dateLacra = moment(dateLacra).add(-4, 'hours');
  const dateLacra2 = moment(dateLacra).add(3, 'days');


  MaintenanceReport.create({
    airplaneId: airplaneId,
    startDate: dateLacra,
    endDate: dateLacra2
  })
  .then(result => {
    req.flash('success', 'You have successfully registered a Maintenance');
    res.redirect('/admin/reportsMaintenances');
  })
  .catch(err => console.log(err));
};

exports.reportsCancelations = (req, res) => {
  const flightCode = req.body.flightCode;
  const date = new Date();
  let dateLacra = `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() } ${ date.getHours() }:${ date.getMinutes() }:00`;
  dateLacra = moment(dateLacra).add(-4, 'hours');

  CancelationManifest.create({
    flightCode: flightCode,
    date: dateLacra
  })
  .then(result => {
    req.flash('success', 'You have successfully registered a Cancelation');
    res.redirect('/admin/reportsCancelations');
  })
    .catch(err => console.log(err));
};

exports.reportsDetours = (req, res) => {
  const newDestination = req.body.newDestination;
  const flightCode = req.body.flightCode;
  const date = new Date();
  let dateLacra = `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() } ${ date.getHours() }:${ date.getMinutes() }:00`;
  dateLacra = moment(dateLacra).add(-4, 'hours');

  DetourManifest.create({
    newDestination,
    flightCode,
    date: dateLacra
  })
  .then(result => {
    req.flash('success', 'You have successfully registered a Detour Manifest');
    res.redirect('/admin/reportsDetours');
  })
  .catch(err => console.log(err));
};






exports.approveDetour = (req, res) => {
  const detourId = req.params.detourId;

  DetourManifest.update({ state: 'Approved' }, { where: { id: detourId } })
    .then(result => {
      req.flash('success', 'This Detour Manifest has been Approved');
      req.session.save(function () {
        res.redirect('/admin/reportsDetours');
      });
    })
      .catch(err => console.log(err));
};

exports.rejectDetour = (req, res) => {
  const detourId = req.params.detourId;

  DetourManifest.update({ state: 'Rejected' }, { where: { id: detourId } })
    .then(result => {
      req.flash('success', 'This Detour Manifest has been Rejected');
      req.session.save(function () {
        res.redirect('/admin/reportsDetours');
      });
    })
      .catch(err => console.log(err));
};


exports.approveCancelation = (req, res) => {
  const cancelationId = req.params.cancelationId;

  CancelationManifest.update({ state: 'Approved' }, { where: { id: cancelationId } })
    .then(result => {
      req.flash('success', 'This Cancelation Manifest has been Approved');
      req.session.save(function () {
        res.redirect('/admin/reportsCancelations');
      });
    })
      .catch(err => console.log(err));
};

exports.rejectCancelation = (req, res) => {
  const cancelationId = req.params.cancelationId;

  CancelationManifest.update({ state: 'Rejected' }, { where: { id: cancelationId } })
    .then(result => {
      req.flash('success', 'This Cancelation Manifest has been Rejected');
      req.session.save(function () {
        res.redirect('/admin/reportsCancelations');
      });
    })
      .catch(err => console.log(err));
};

