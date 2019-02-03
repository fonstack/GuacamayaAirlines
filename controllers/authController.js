const passport = require('passport');
const crypto = require('crypto');
const promisify = require('es6-promisify');

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    successFlash: 'You are now Logged In!',
    failureFlash: 'Error on login!'
  }, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      req.flash('error', 'The email address or password provided is incorrect!');
      return req.session.save(function () {
        return res.redirect('/login');
      });
    }

    // req / res held in closure
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.flash('success', 'You are now Logged In!');
      return req.session.save(function () {
        return res.redirect('/');
      });
    });
  })(req, res, next);
};

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