const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Airplane = sequelize.define("Airplane", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  // Clave Foránea con AirplaneModel
  model: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Airplane;