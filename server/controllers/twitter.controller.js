const Twitter = require("../models/twitter");

const Location = require("../models/location");

// Twitter calls

module.exports.searchTweets = function(req, res) {
    Twitter.get("search/tweets", {
        q: req.body.q,
        //geocode: req.body.geocode,
        result_type: req.body.result_type,
        count: req.body.count,
    }, function(err, data) {
        if (err) {
            console.log(err);
            res.status(400);
            res.json(err);
            return;
        }

        res.status(200).json(data);
        return;
    });
};

module.exports.trendsPlace = function(req, res) {

    const locName = req.body.name;
    var woe_id = 0;

    Location.findOne({"name" : new RegExp('^'+ locName + '$', "i")}, function(err, data) {
        if (err) {
            console.log(err);
            res.status(400);
            res.json(err);
            return;
        }

        if (data == null) {
            console.log("No results found.");
            res.status(400);
            res.json({ error: "No results found."});
            return;
        }

        console.log("Valid WOEID");
        console.log(data.woe_id);

        Twitter.get("trends/place", {
            id: data.woe_id
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.status(400);
                res.json(err);
                return;
            }

            res.status(200).json(data);
            return;
        });
    });
};

// var test = function(req) {
//     twitter.get("trends/place", {
//         id: req.body.id
//     }, function(err, data, res) {
//         if (err) {
//             console.log(err)
//             return;
//         }

//         console.log(data);
//         return;
//     });
// }

// var req = {
//     body: {
//         id: 2450021
//     }
// }

// test(req);
