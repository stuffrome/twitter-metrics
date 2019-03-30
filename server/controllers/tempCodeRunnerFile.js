module.exports.searchTweets = function(req, res) {
//     twitter.get("search/tweets", {
//         q: req.body.q,
//         //geocode: req.body.geocode,
//         result_type: req.body.result_type,
//         count: req.body.count,
//     }, function(err, data, res) {
//         if (err) {
//             res.status(400);
//             res.json(err);
//             return;
//         }

//         console.log(data);
//         res.status(200).json(data);
//         return;
//     });
// };