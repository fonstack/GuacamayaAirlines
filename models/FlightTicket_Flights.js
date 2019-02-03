const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const FlightTicket_Flights = sequelize.define("FlightTicket_Flights", {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  seatNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cantPacking: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isBoard: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  affectOverbooking: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  affectCancellation: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  wasReintegrated: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});

module.exports = FlightTicket_Flights;