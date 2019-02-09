const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const CancelationManifest = sequelize.define("CancelationManifest", {
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
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Pending'
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = CancelationManifest;