const twitter = require("../models/twitter");

// Twitter calls

module.exports.searchTweets = function(req, res) {
    console.log("I got called");
    console.log(req.body);
    twitter.get("search/tweets", {
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

        console.log(data);
        res.status(200).json(data);
        return;
    });
};

// var test = function(req) {
//     twitter.get("search/tweets", {
//         q: req.body.q,
//         //geocode: req.body.geocode,
//         result_type: req.body.result_type,
//         count: req.body.count,
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
//         q: "banana",
//         result_type: "mixed",
//         count: 1
//     }
// }

// test(req);