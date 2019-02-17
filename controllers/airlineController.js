const sequelize = require("../config/database");


exports.viewHome = (req, res) => {
  res.render("home", { title: 'home' });
};

exports.viewLogin = (req, res) => {
  res.render("login", { title: 'login' });
};

exports.viewRegister = (req, res) => {
  res.render("register", { title: 'register' });
};

exports.viewDashboard = (req, res) => {
  res.render("dashboard", { title: 'dashboard' });  
};

exports.viewAirport = (req, res) => {
  const iata = req.params.iata.toUpperCase();
  if ( iata !== 'MIA' && iata !== 'CCS' && iata !== 'JFK' && iata !== 'ATL' && iata !== 'CDG' && iata !== 'DXB') {
    req.flash('error', 'This airport does not exists.');
    req.session.save(function () {
      res.redirect('/');
    });
  } else {
    let airport = {};

    sequelize.query(`
      SELECT city, lon, lat, name 
      FROM Airports
      WHERE IATACode = '${iata}'
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      airport = {
        iata,
        city: result[0].city,
        lon: result[0].lon,
        lat: result[0].lat,
        name: result[0].name
      };

      return sequelize.query(`
        SELECT Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
        FROM Flights
        INNER JOIN Routes ON Flights.routeId = Routes.id
        WHERE Routes.origin = '${iata}' OR Routes.destiny = '${iata}'
      `, { type: sequelize.QueryTypes.SELECT});
    })
    .then(result => {
      airport.flights = result;
      res.render("airport", { title: 'airport', airport });
    })
      .catch(err => console.log(err));
  }
};

exports.viewAdmin = (req, res) => {
  res.render("admin", { title: 'admin' });
};

exports.searchFlights = (req, res) => {
  if (req.body.from === req.body.to) {
    req.flash('error', 'Can\'t search a flight with same origin and destiny.');
    req.session.save(function () {
      res.redirect('/');
    });
    return;
  }

  const from = req.body.from;
  const to = req.body.to;
  const dateDepart = req.body.dateDepart;
  const [day, month, year] = dateDepart.split('/');
  const newdate = `${year}-${month}-${day}`;
  const scales = req.body.scales;

  
  if (req.body.from && req.body.to && req.body.from && !req.body.dateDepart && !req.body.scales) { // From, To, NoScales
    sequelize.query(`
      SELECT city, lon, lat, name 
      FROM Airports
      WHERE IATACode = '${to}'
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      airport = {
        iata: to,
        city: result[0].city,
        lon: result[0].lon,
        lat: result[0].lat,
        name: result[0].name
      };

      return sequelize.query(`
        SELECT Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
        FROM Flights
        INNER JOIN Routes ON Flights.routeId = Routes.id
        WHERE Routes.origin = '${from}' AND Routes.destiny = '${to}'
      `, { type: sequelize.QueryTypes.SELECT});
    })
    .then(result => {
      airport.flights = result;
      if (airport.flights.length === 0) {
        req.flash('info', 'Not found flights like that.');
        req.session.save(function () {
          res.redirect('/');
        });
      } else {
        res.render("airport", { title: 'airport', airport });
      }
    })
      .catch(err => console.log(err));

  } else if (req.body.from && req.body.to && req.body.from && req.body.dateDepart && !req.body.scales) { // From, To, Date, NoScales
    sequelize.query(`
      SELECT city, lon, lat, name 
      FROM Airports
      WHERE IATACode = '${to}'
    `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      airport = {
        iata: to,
        city: result[0].city,
        lon: result[0].lon,
        lat: result[0].lat,
        name: result[0].name
      };

      return sequelize.query(`
        SELECT Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
        FROM Flights
        INNER JOIN Routes ON Flights.routeId = Routes.id
        WHERE Routes.origin = '${from}' AND Routes.destiny = '${to}' AND Flights.date = '${newdate}'
      `, { type: sequelize.QueryTypes.SELECT});
    })
    .then(result => {
      airport.flights = result;
      if (airport.flights.length === 0) {
        req.flash('info', 'Not found flights like that.');
        req.session.save(function () {
          res.redirect('/');
        });
      } else {
        res.render("airport", { title: 'airport', airport });
      }
    })
      .catch(err => console.log(err));

  } else if (req.body.from && req.body.to && req.body.from && !req.body.dateDepart && req.body.scales) { // From, To, Scales

  } else if (req.body.from && req.body.to && req.body.from && req.body.dateDepart && req.body.scales) { // From, To, Date, Scales

  }

};




// -------- QUERYS --------

// Tabla con el precio de todos los vuelos charter y su ID
sequelize.query(`
  SELECT Charters.id, Providers.pricePerKilometer * Routes.travelDistance as charterCost
  FROM Charters 
  INNER JOIN Providers ON Charters.providerId = Providers.id
  INNER JOIN Routes ON Charters.routeId = Routes.id
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

// Ganancia de todos los tickets normales vendidos en un perído determinado
sequelize.query(`
  SELECT SUM(salePrice) as ticketsProfit FROM FlightTicket
  WHERE createdAt = '2019-11-15'
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

// Costo de todos los vuelos charter en una período determinado
sequelize.query(`
  SELECT SUM(Providers.pricePerKilometer * Routes.travelDistance) as charterCost 
  FROM Charters 
  INNER JOIN Providers ON Charters.providerId = Providers.id
  INNER JOIN Routes ON Charters.routeId = Routes.id
  WHERE date = '2019-11-15'
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

// Tabla con ID de cada vuelo acompañado de #Tickets, #Abordados y %Abordados
sequelize.query(`
  SELECT flightCode, COUNT(flightCode) as cantTickets, SUM(isBoard) as cantBoard, concat( truncate( ( (SUM(isBoard) / COUNT(isBoard)) * 100), 2 ), '%' ) as percentageBoard
  FROM FlightTicket_Flights
  GROUP BY flightCode
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

// Tabla con destinos más visitados con la cantidad de Tickets
sequelize.query(`
  SELECT count(Routes.destiny), Routes.destiny
  FROM Flights
  INNER JOIN Routes ON Flights.routeId = Routes.id
  INNER JOIN FlightTicket_Flights ON Flights.code = FlightTicket_Flights.flightCode
  GROUP BY Routes.destiny
  ORDER BY count(Routes.destiny) DESC
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

    // Tabla con cantidad de personas de n edad
    sequelize.query(`
      SELECT count(age) as totalCustomers, age
      FROM Customers
      GROUP BY age
      ORDER BY totalCustomers DESC
    `).then(result => res.json(result[0]))
        .catch(err => console.log(err));

    // Tabla con cantidad de personas de n nacionalidad
    sequelize.query(`
      SELECT count(nationality) as totalCustomers, nationality
      FROM Customers
      GROUP BY nationality
      ORDER BY totalCustomers DESC
    `).then(result => res.json(result[0]))
        .catch(err => console.log(err));

    // Tabla con cantidad de personas de n género
    sequelize.query(`
      SELECT count(gender) as totalCustomers, gender
      FROM Customers
      GROUP BY gender
      ORDER BY gender DESC
    `).then(result => res.json(result[0]))
        .catch(err => console.log(err));

// Tabla con cantidad de pasajes con sobreventa de un vuelo específico
sequelize.query(`
  SELECT flightTicketId, count(flightCode)
  FROM FlightTicket_Flights
  WHERE affectOverbooking = 1
  GROUP BY flightCode
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

// Tabla con id de avión y peso promedio de los vuelos
sequelize.query(`
  SELECT Flights.airplaneId, (SUM(FlightTicket_Flights.cantPacking * 23) / count(DISTINCT Flights.code)) as promedio
  FROM Flights
  INNER JOIN FlightTicket_Flights ON Flights.code = FlightTicket_Flights.flightCode
  GROUP BY Flights.airplaneId
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

// Porcentaje de vuelos son sobreventa
sequelize.query(`
  SELECT count(DISTINCT flightTicketId) as uniqueFlight, count(DISTINCT flightTicketId), count(case flightTicketId when affectOverbooking = 1 then 1 else null end)
  FROM FlightTicket_Flights;
  SELECT concat((100*(count(case flightTicketId when affectOverbooking = 1 then 1 else null end)/count(DISTINCT flightTicketId))), '%') as uniqueFlight 
  FROM FlightTicket_Flights;
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

// Tabla con ID de vuelo, Origen, Destino, Fecha Salida, Precio (Solo elige origen y destino) NO ESCALA
sequelize.query(`
  SELECT Flights.code, Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
  FROM Flights
  INNER JOIN Routes ON Flights.routeId = Routes.id
  WHERE Routes.origin = 'ATL' AND Routes.destiny = 'CDG'; 
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

// Tabla con ID de vuelo, Origen, Destino, Fecha de salida, Precio (Elige origen, destino y fecha) NO ESCALA
sequelize.query(`
  SELECT Flights.code, Routes.origin, Routes.destiny, Flights.date, Routes.basePrice
  FROM Flights
  INNER JOIN Routes ON Flights.routeId = Routes.id
  WHERE Routes.origin = 'ATL' AND Routes.destiny = 'CDG' AND Flights.date = '2019-04-13'; 
`).then(result => res.json(result[0]))
    .catch(err => console.log(err));

// Tabla con ID de vuelo, Origen, Destino, Fecha de salida, Precio (Elige origen, destino, fecha y con escala)



















// #################################
// ######## PRIMERA ENTREGA ########
// #################################
// exports.viewOffices = (req, res) => {
//   Office.findAll({ where: { rip: 0 } })
//     .then(offices => {
//       res.render("project", { title: 'project', offices });
//     })
//       .catch(err => console.log('ERROR IN ViewOffices ' + err));

//   // sequelize.query('SELECT * FROM Offices WHERE rip = 0', { type: sequelize.QueryTypes.SELECT})
//   //   .then(offices => {
//   //     res.render("project", { title: 'project', offices });
//   //   })
//   //     .catch(err => console.log('ERROR IN ViewOffices ' + err));
// };

// exports.createOffice = (req, res) => {
//   Office.create({
//     phone: req.body.phone,
//     address: req.body.address,
//     country: req.body.country})
//       .then(result => {
//         req.flash('success', 'An Office was added succesfully!');
//         req.session.save(function () {
//           res.redirect('/project');
//         });
//       })
//         .catch(err => console.log('ERROR IN CreateOffice ' + err));
// };

// exports.deleteOffice = (req, res) => {
//   const idToDelete = req.params.id;
//   Office.update({ rip: 1 }, { where: { officeCode: idToDelete } })
//     .then(result => {
//       req.flash('success', 'The Office was deleted succesfully!');
//       req.session.save(function () {
//         res.redirect('/project');
//       });
//     })
//       .catch(err => console.log('ERROR IN DeleteOffice ' + err));

//   // sequelize.query(`UPDATE Offices SET rip = 1 WHERE officeCode = ${idToDelete}`)
//   //   .then(result => {
//   //     req.flash('success', 'The Office was deleted succesfully!');
//   //     res.redirect('/project');
//   //   })
//   //     .catch(err => console.log('ERROR IN DeleteOffice ' + err));
// };