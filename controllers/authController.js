const passport = require('passport');
const crypto = require('crypto');
const promisify = require('es6-promisify');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/dashboard',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👋🏽');
  res.redirect('/');
};

exports.needLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Oops! You must be logged in to go that');
  res.redirect('/login');
};

exports.noNeedLogged = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
    return;
  }
  next();
};