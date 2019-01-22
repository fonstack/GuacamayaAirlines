

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
  const iata = req.params.iata;
  if ( iata !== 'MIA' && iata !== 'CCS' && iata !== 'JFK' && iata !== 'ATL' && iata !== 'CDG') {
    req.flash('error', 'This airport does not exists.');
    res.redirect('back');
  } else {
    res.render("airport", { title: 'airport', iata: req.params.iata });
  }
};