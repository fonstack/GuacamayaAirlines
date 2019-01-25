const Office = require('../models/Office');

exports.viewHome = (req, res) => {
  res.render("home", { title: 'home' });
};

exports.viewLogin = (req, res) => {
  res.render("login", { title: 'login' });
};

exports.viewRegister = (req, res) => {
  res.render("register", { title: 'register' });
};

exports.viewDashboard = (req, res) => {
  res.render("dashboard", { title: 'dashboard' });
};

exports.viewAirport = (req, res) => {
  const iata = req.params.iata.toUpperCase();
  if ( iata !== 'MIA' && iata !== 'CCS' && iata !== 'JFK' && iata !== 'ATL' && iata !== 'CDG' && iata !== 'DXB') {
    req.flash('error', 'This airport does not exists.');
    res.redirect('/');
  } else {
    const airport = {
      iata,
      city: 'MIAMI',
      coordinates: [-79.5455, 43.59934],
      name: 'Hartsfield–Jackson International Airport',
      flights: [
        {
          from: 'MIA - Miami',
          to: 'CCS - Caracas',
          departDate: '12-02-2019',
          price: 965
        },
        {
          from: 'CCS - Caracas',
          to: 'DXB - Dubai',
          departDate: '12-02-2019',
          price: 620
        },
        {
          from: 'JFK - New York',
          to: 'CCS - Caracas',
          departDate: '12-02-2019',
          price: 1630
        }

      ]
    };
    res.render("airport", { title: 'airport', airport });
  }
};

exports.viewAdmin = (req, res) => {
  res.render("admin", { title: 'admin' });
};




// #################################
// ######## PRIMERA ENTREGA ########
// #################################
exports.viewOffices = (req, res) => {
  let offices = [];

  res.render("project", { title: 'project', offices });
};

exports.createOffice = (req, res) => {
  Office.create({
    phone: req.body.phone,
    address: req.body.address,
    country: req.body.country})
      .then(result => console.log(result))
        .catch(err => console.log(err));

  req.flash('success', 'An Office was added succesfully!');
  res.redirect('/project');
};

exports.deleteOffice = (req, res) => {
  const idToDelete = req.params.id;

  res.redirect('/project');
};