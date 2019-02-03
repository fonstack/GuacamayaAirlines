const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const CharterTicket = sequelize.define("CharterTicket", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  // Clave Foránea con Customer
  // passengerId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Clave Foránea con CharterFlight
  // charterId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
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
  }
});

module.exports = CharterTicket;