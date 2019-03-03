const mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('User');

passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    function(username, password, done) {
        User.findOne({email: username},
        function(err, user) {
            if (err) {
                return done(err);
            }

            // Invalid username
            if (!user) {
                return done(null, false, {
                    message: 'Invalid username/password'
                });
            }

            // Invalid password
            if (!user.validatePassword(password)) {
                return done(null, false, {
                    message: 'Invalid username/password'
                });
            }

            // Correct credentials
            return done(null, user);
        });
    }
));
