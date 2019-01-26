const User = require('../models/user');
const bcrypt = require("bcryptjs");
const { ROUNDS } = process.env;


exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, identityCard, email, password } = req.body;
    const salt = await bcrypt.genSalt(parseInt(ROUNDS));
    const hash = await bcrypt.hash(password, salt);
    
    const response = await User.create({
      firstName,
      lastName,
      identityCard,
      email,
      password: hash
    });
    next()
    
  } catch (error) {
    console.log('ERROR IN Register ' + err)
  }
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('firstName');
  req.sanitizeBody('lastName');
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.body.firstName = req.body.firstName.toLowerCase();
  req.body.firstName = req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1);

  req.body.lastName = req.body.lastName.toLowerCase();
  req.body.lastName = req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1);

  User.findOne({ where: { email: req.body.email } })
    .then(result => {
      if (!result) {

        User.findOne({ where: { identityCard: req.body.identityCard } })
          .then(resultt => {
            if (!resultt) {
              next();
            } else {
              req.flash('error', 'This identity card is alredy registered!');
              res.render('register', { title: 'register', body: req.body, flashes: req.flash() });
              return;
            }
          })
            .catch(err => console.log(err));

      } else {
        req.flash('error', 'This email is alredy taken!');
        res.render('register', { title: 'register', body: req.body, flashes: req.flash() });
        return;
      }
    })
      .catch(err => console.log(err));
};