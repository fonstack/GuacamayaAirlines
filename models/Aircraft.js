const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Aircraft = sequelize.define("Aircraft", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Aircraft;