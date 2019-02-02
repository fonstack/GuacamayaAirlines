const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Employee = require("../models/Employee");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, done) => {
      Employee.findOne({ where: { email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Incorrect username!" });
          }
          if (!user.compare(password)) {
            return done(null, false, { message: "Incorrect password!" });
          }
          return done(null, user);
        })
          .catch(err => done(err));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Employee.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
