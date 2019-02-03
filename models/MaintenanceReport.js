const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const MaintenanceReport = sequelize.define("MaintenanceReport", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  // Clave Foránea con Airplane
  airplane: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = MaintenanceReport;