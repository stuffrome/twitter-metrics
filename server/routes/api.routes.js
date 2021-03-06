const express = require("express"),
      router = express.Router(),
      jwt = require("express-jwt");

const config = require("../configs/config"),
      authController = require("../controllers/auth.controller"),
      twitterController = require("../controllers/twitter.controller"),
      locationController = require("../controllers/location.controller");

// JWT Verificaiton

const getTokenFromHeaders = function(req) {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }

  return null;
};

const auth = {
  required: jwt({
    secret: config.secret,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: config.secret,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

// Authentication
router.post("/register", auth.optional, authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Twitter API
router.post("/searchtweets", twitterController.searchTweets);
router.post("/searchtrends", twitterController.trendsPlace);
router.post("/searchusers", twitterController.searchUsers);
router.post("/usertweets", twitterController.userTweets);

// Geolocation
router.get("/geolocation", locationController.getAll);
router.post("/geolocation",locationController.matchWith)

// Dashboard

module.exports = router;