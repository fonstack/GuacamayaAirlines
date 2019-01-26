const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    (email, password, done) => {
      User.findOne({ where: { email } })
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
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
