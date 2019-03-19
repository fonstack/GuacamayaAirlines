const sequelize = require("../config/database");

exports.getCustomers = (req, res) => {
  sequelize.query(`
    SELECT identityCard, gender
    FROM Customers
  `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.json(result);
      return null;
    })
      .catch(err => console.log(err));
};

exports.getCustomer = (req, res) => {
  const identityC = req.params.identityC;

  sequelize.query(`
    SELECT identityCard, firstName, lastName, age, nationality, gender, email 
    FROM Customers
    WHERE identityCard = ${identityC}
  `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.json(result);
      return null;
    })
      .catch(err => console.log(err));
};

exports.getEmptySeatsOfFlight = (req, res) => {
  const flightCode = req.params.flightCode;

  sequelize.query(`
    SELECT Flights.code, FlightTicket_Flights.seatNumber
    FROM Flights
    INNER JOIN FlightTicket_Flights ON FlightTicket_Flights.flightCode = Flights.code
    INNER JOIN Airplanes ON Airplanes.id = Flights.airplaneId
    INNER JOIN AirplaneModels ON AirplaneModels.model = Airplanes.model
    HAVING Flights.code = ${flightCode}
    ORDER BY FlightTicket_Flights.seatNumber ASC;
  `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.json(result);
      return null;
    })
      .catch(err => console.log(err));

};

exports.getAirplanesRoutes = (req, res) => {
  let routesVSairplanes = [];
  const airplaneId = req.params.airplaneId;

  sequelize.query(`
    SELECT airplaneId, routeId, Routes.origin, Routes.destiny
    FROM Airplane_Routes
    INNER JOIN Routes ON Routes.id = Airplane_Routes.routeId
    WHERE airplaneId = ${airplaneId}
    ORDER BY airplaneId ASC, scaleNumber ASC
  `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      result.forEach(element => {
        routesVSairplanes.push({
          airplaneId: element.airplaneId,
          routeId: element.routeId,
          origin: element.origin,
          destiny: element.destiny
        });
      });
      
      res.json({ airplaneRoutes: routesVSairplanes });
      return null;
    })
}

exports.getTicketsSold = (req, res) => {
  sequelize.query(`
    SELECT count(id) as cant
    FROM FlightTickets
  `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      res.json({ticketsSold: result});
      return null;
    })
}

exports.getFlightsOverbooking = (req, res) => {
  sequelize.query(`
    SELECT count(flightCode) as cant
    FROM FlightTicket_Flights
    WHERE affectOverbooking = 1
  `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      res.json({flightsOverbooking: result});
      return null;
    })
}

exports.getTotalProfits = (req, res) => {
  sequelize.query(`
    SELECT SUM(salePrice) as profits
    FROM FlightTickets
  `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      res.json({profits: result});
      return null;
    })
}

exports.getProfitOnInterval = (req, res) => {
  const date1 = req.params.first;
  const dateLacra1 = `${ date1.split('-')[2] }-${ date1.split('-')[1] }-${ date1.split('-')[0] }`;
  const date2 = req.params.second;
  const dateLacra2 = `${ date2.split('-')[2] }-${ date2.split('-')[1] }-${ date2.split('-')[0] }`;

  sequelize.query(`
    SELECT SUM(salePrice) as profits
    FROM FlightTickets
    WHERE '${dateLacra1}' < createdAt AND '${dateLacra2}' > createdAt
  `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      res.json({profits: result});
      return null;
    })
}

exports.getNumberFlightsPerMonth = (req, res) => {
  const month = req.params.month;

  sequelize.query(`
    SELECT count(code) as cant
    FROM Flights
    WHERE date BETWEEN '2019-${month}-01' AND '2019-${month}-31'
  `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      res.json(result);
      return null;
    })
}

exports.getDifferentsAirplanes = (req, res) => {
  sequelize.query(`
    SELECT id, model 
    FROM Airplanes
  `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      res.json(result);
      return null;
    })
}

exports.getFlightsPerAirplane = (req, res) => {
  sequelize.query(`
    SELECT count(code) as cant
    FROM Flights
    GROUP BY airplaneId
    ORDER BY airplaneId ASC
  `, { type: sequelize.QueryTypes.SELECT })
    .then(result => {
      res.json(result);
      return null;
    })
}