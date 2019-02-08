const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Flight = sequelize.define("Flight", {
  code: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  // Clave Foránea con AirplaneScales
  // airplaneId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  // Clave Foránea con AirplaneScales
  // routeId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'On Time'
  }
});

module.exports = Flight;