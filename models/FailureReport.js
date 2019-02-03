const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const FailureReport = sequelize.define("FailureReport", {
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
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Detected'
  }
});

module.exports = FailureReport;