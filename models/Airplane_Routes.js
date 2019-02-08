const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Airplane_Routes = sequelize.define("Airplane_Routes", {
  scaleNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Airplane_Routes;