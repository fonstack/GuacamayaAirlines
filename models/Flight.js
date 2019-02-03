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
  // scaleNumber: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  state: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

module.exports = Flight;