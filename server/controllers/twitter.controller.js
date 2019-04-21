const twitter = require("../models/twitter");
    //   cities = require("all-the-cities");

const Location = require("../models/location");

// Twitter calls

module.exports.searchTweets = function(req, res) {
    twitter.get("search/tweets", {
        q: req.body.q,
        //geocode: req.body.geocode,
        result_type: req.body.result_type,
        count: req.body.count,
    }, function(err, data) {
        if (err) {
            // console.log(err);
            res.status(400);
            res.json(err);
            return;
        }

        res.status(200).json(data);
        return;
    });
};

module.exports.searchUsers = function(req, res) {
    twitter.get("users/search", {
        q: req.body.name,
        //count: req.body.count,
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

module.exports.userTweets = function(req, res) {
    twitter.get("statuses/user_timeline", {
        screen_name: req.body.screen_name
        // screen_name: "twitterapi"
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

        twitter.get("trends/place", {
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
