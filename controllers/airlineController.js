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
    const airport = {
      iata,
      city: 'MIAMI',
      coordinates: [-79.5455, 43.59934],
      name: 'Hartsfield–Jackson International Airport',
      flights: [
        {
          from: 'MIA - Miami',
          to: 'CCS - Caracas',
          departDate: '12-02-2019',
          price: 965
        },
        {
          from: 'CCS - Caracas',
          to: 'DXB - Dubai',
          departDate: '12-02-2019',
          price: 620
        },
        {
          from: 'JFK - New York',
          to: 'CCS - Caracas',
          departDate: '12-02-2019',
          price: 1630
        }

      ]
    };
    res.render("airport", { title: 'airport', airport });
  }
};

exports.viewAdmin = (req, res) => {
  res.render("admin", { title: 'admin' });
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

// Tabla con ID de vuelo, Origen, Destino, Fecha Salida, Precio (Solo elige origen y destino)


// Tabla con ID de vuelo, Origen, Destino, Fecha de salida, Precio (Elige origen, destino y fecha)

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