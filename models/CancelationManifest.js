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
  isPending: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

module.exports = CancelationManifest;