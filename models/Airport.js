const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Airport = sequelize.define("Airport", {
  IATACode: {
    type: Sequelize.STRING(3),
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  landingSize: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  takeofSize: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  cantCrew: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Airport;