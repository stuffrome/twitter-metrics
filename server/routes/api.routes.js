const express = require("express"),
      router = express.Router(),
      jwt = require("express-jwt");

const config = require("../configs/config"),
      authController = require("../controllers/auth.controller"),
      dashboardController = require("../controllers/dashboard.controller");

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

// Dashboard


module.exports = router;