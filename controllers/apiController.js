const sequelize = require("../config/database");

exports.getCustomers = (req, res) => {
  sequelize.query(`
    SELECT identityCard, gender
    FROM Customers
  `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.json(result)
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
      res.json(result)
    })
      .catch(err => console.log(err));
};

exports.getEmptySeats = (req, res) => {
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
      res.json(result)
    })
      .catch(err => console.log(err));

};