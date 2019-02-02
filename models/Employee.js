const Sequelize = require("sequelize");
Sequelize.Promise = global.Promise;
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");

const Employee = sequelize.define("Employee", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  identityCard: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


Employee.encrypt = function ({ password }) {
  const salt = bcrypt.genSaltSync(process.env.SALT);
  return bcrypt.hashSync(password, salt);
};

Employee.prototype.compare = function(password) {
  const hash = this.password;
  return bcrypt.compareSync(password, hash);
};

module.exports = Employee;