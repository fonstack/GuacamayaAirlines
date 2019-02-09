const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const DetourManifest = sequelize.define("DetourManifest", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  // Clave Foránea con Flight
  // flightCode: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  newDestination: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Pending'
  }
});

module.exports = DetourManifest;