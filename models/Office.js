const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Office = sequelize.define('Office', {
  officeCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rip: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = Office;