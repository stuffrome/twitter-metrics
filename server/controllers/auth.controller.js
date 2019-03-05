const passport = require("passport"),
      mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports.register = function(req, res) {
    var user = new User();

    console.log(req.body);

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
};

module.exports.login = function() {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/",
        failureFlash: true
    })
    // passport.authenticate("local", function(err, user, info) {
    //     if (err) {
    //         res.status(404).json(err);
    //         return;
    //     }

    //     if (user) {
    //         const token = user.generateJWT();
    //         res.status(200);
    //         res.json({
    //             "token": token
    //         });
    //         res.redirect("/dashboard");
    //     }
    //     else {
    //         res.status(401).json(info);
    //     }
    // })(req, res);
};