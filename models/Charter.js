const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Charter = sequelize.define("Charter", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
// CLAVES FORANEAS
//   detour: {
//     type: Sequelize.Date,
//     allowNull: false
//   },
//   providerId: {
//     type: Sequelize.Date,
//     allowNull: false
//   },
//   origin,destiny: {
//     type: Sequelize.Date,
//     allowNull: false,
//     defaultValue: true
//   },
  date: {
    type: Sequelize.Date,
    allowNull: false,
    defaultValue: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'On Time'
  }
});

module.exports = Charter;