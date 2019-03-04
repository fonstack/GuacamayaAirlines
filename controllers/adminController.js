const sequelize = require("../config/database");
const Flight = require("../models/Flight");
const moment = require('moment');

exports.viewAdminOnly = (req, res) => {
  res.render("admin", { title: 'admin' });
};

exports.viewAdmin = (req, res) => {
  const section = req.params.section;

  if (section === 'planningFlights') {
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
  } else if (section === 'planningCharters') {
    let charters = [];
    sequelize.query(`
      SELECT Charters.id, Charters.date, Charters.state, Charters.detourId, Charters.providerId, Providers.name, routeId, Routes.origin, Routes.destiny
      FROM Charters
      INNER JOIN Routes ON Routes.id = Charters.routeId
      INNER JOIN Providers ON providerId = Providers.id
    `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      result.forEach(element => {
          charters.push({
            id: element.id,
            date: element.date,
            state: element.state,
            detourId: element.detourId,
            providerId: element.providerId,
            providerName: element.name,
            routeId: element.routeId,
            origin: element.origin,
            destiny: element.destiny
          });
      });

      res.render("admin/planningCharters", { title: 'admin' , charters});
    })
    .catch(err => console.log(err));
  } else if (section === 'planningRoutes') {
    res.render("admin/planningRoutes", { title: 'admin' });
  } else if (section === 'planningAirplanes') {
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

  else if (section === 'reportsFailures') {
    res.render("admin/reportsFailures", { title: 'admin' });
  } else if (section === 'reportsMaintenances') {
    res.render("admin/reportsMaintenances", { title: 'admin' });
  } else if (section === 'reportsDetours') {
    res.render("admin/reportsDetours", { title: 'admin' });
  } else if (section === 'reportsCancelations') {
    res.render("admin/reportsCancelations", { title: 'admin' });
  }

  else if (section === 'salesFlightTickets') {
    res.render("admin/salesFlightTickets", { title: 'admin' });
  } else if (section === 'statisticsFlightTickets') {
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
exports.adminFlights = (req, res) => {
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