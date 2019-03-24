const passport = require("passport"),
      mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports.register = function(req, res) {
    var user = new User();

    console.log(req.body);

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
};

module.exports.login = function(req, res) {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            res.status(404).json(err);
            return;
        }

        if (user) {
            req.login(user, function(err) {
                if (err) {
                    res.status(401);
                }
                res.status(200);
                return res.redirect("/dashboard");
            })
            // const token = user.generateJWT();
            // res.status(200);
            // res.json({
            //     "token": token
            // });
        }
        else {
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
};