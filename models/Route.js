const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Route = sequelize.define("Route", {
  origin: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  destiny: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  basePrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  travelDistance: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  travelTime: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Route;