const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.loadDashboard = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "Unauthorized Access"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};
