const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Provider = sequelize.define("Provider", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  responseTime: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pricePerKilometer: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Provider;