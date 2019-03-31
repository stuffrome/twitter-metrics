const mongoose = require("mongoose");

const Location = require("../models/location");

module.exports.getAll = function(req, res) {
    Location.find({}, function(err, data) {
        if (err) {
            console.log(err);
            res.status(400);
            res.json(err);
            return;
        }

        console.log(data);
        res.status(200).json(data);
        return;
    })
};

module.exports.matchWith = function(req, res) {

    console.log(req.body);

    Location.find({"name" : new RegExp(req.body.token, "i")}, function(err, data) {
        if (err) {
            console.log(err);
            res.status(400);
            res.json(err);
            return;
        }

        // console.log(data);
        res.status(200).json(data);
        return;
    })
}

// var match = function(input) {
//     Location.find({"name" : new RegExp(input, "i")}, function(err, data) {
//         if (err) {
//             console.log(err);
//             return;
//         }

//         console.log(data);
//         return;
//     })
// };

// match("Worldwide");