const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Route = sequelize.define("Route", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  origin: {
    type: Sequelize.STRING,
    allowNull: false
  },
  destiny: {
    type: Sequelize.STRING,
    allowNull: false
  },
  basePrice: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  travelDistance: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  travelTime: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

module.exports = Route;