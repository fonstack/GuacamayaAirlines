const passport = require('passport');
const crypto = require('crypto');
const promisify = require('es6-promisify');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/admin'
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.needLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Oops! You must be logged in to go that');
  res.render("login", { title: 'login', flashes: req.flash() });
};

exports.noNeedLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  next();
};