const passport = require('passport'),
      mongoose = require('mongoose');

const User = mongoose.model('User');

const sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

module.exports.register = function(req, res) {
    var user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save( function(err) {
        const token = user.generateJWT();
        res.status(200);
        res.json({
            "token": token
        });

        if (err) {
            console.log(err);
        }
    });

    res.redirect('/');
};

module.exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user) {
            const token = user.generateJWT();
            res.status(200);
            res.json({
                "token": token
            });
            res.redirect('/dashboard');
        }
        else {
            res.status(401).json(info);
        }
    })(req, res);
};