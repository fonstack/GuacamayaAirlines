const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Airplane = sequelize.define("Airplane", {
  model: {
    type: Sequelize.STRING(),
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  manufacturer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  maxSpeed: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  cruisingSpeed: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  takeofDistanceMaxWeight: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  economicSeats: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  businessSeats: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  seatsType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  emptyWeight: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  maxWeight: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  maxPacking: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  minCrew: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fuelType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cantFuel: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  cantBathrooms: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cantEmergencyExits: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cantFirstAid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  hasInternet: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  hasTV: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = Airplane;