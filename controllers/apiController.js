const sequelize = require("../config/database");

exports.getCustomers = (req, res) => {
  sequelize.query(`
    SELECT identityCard, CONCAT(firstName, ' ', lastName) as name 
    FROM Customers
  `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.json(result)
    })
      .catch(err => console.log(err));
};

exports.getCustomer = (req, res) => {
  const identityC = req.params.identityC;

  sequelize.query(`
    SELECT identityCard, firstName, lastName, age, nationality, gender, email 
    FROM Customers
    WHERE identityCard = ${identityC}
  `, { type: sequelize.QueryTypes.SELECT})
    .then(result => {
      res.json(result)
    })
      .catch(err => console.log(err));
};