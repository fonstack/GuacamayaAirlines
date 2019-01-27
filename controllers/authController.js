const passport = require('passport');
const crypto = require('crypto');
const promisify = require('es6-promisify');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/admin'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now Logged Out!');
  req.session.save(function () {
    res.redirect('/');
  });
};

exports.needLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Oops! You must be logged in to go that');
  req.session.save(function () {
    res.redirect('/login');
  });
};

exports.noNeedLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  next();
};