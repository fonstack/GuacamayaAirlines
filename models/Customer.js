const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Customer = sequelize.define("Customer", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  identityCard: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Customer;