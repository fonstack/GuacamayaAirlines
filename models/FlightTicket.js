const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const FlightTicket = sequelize.define("FlightTicket", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
//   buyerId: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   passengerId: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
  salePrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = FlightTicket;