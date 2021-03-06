const express = require("express"),
      session = require("express-session"),
      cors = require("cors"),
      path = require("path"),
      morgan = require("morgan"),
      bodyParser = require("body-parser"),
      passport = require("passport");

const config = require("./configs/config");

module.exports.start = function() {
  // Mongoose database configuration
  require("./configs/database");

  // Passport configuration
  require("./configs/passport");

  // Initialize app
  const app = express();

  // Configure app
  app.use(cors());
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(session({ secret: config.secret, cookie: { maxAge: 60000000 }, resave: false, saveUninitialized: false }));
  app.use(express.static("client", {"root": "./assets"}));

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Set API routes
  const apiRoutes = require("./routes/api.routes");
  app.use("/api", apiRoutes);

  // Frontend routes
  app.use("/dashboard", function(req, res) {
    if (req.isAuthenticated()) {
      res.sendFile("index.html", {"root": "./client"});
    }
    else {
      res.redirect("/");
    }
  })

  app.use("/*", function(req, res) {
    res.sendFile("index.html", {"root": "./client"});
  });

  app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });

  app.listen((process.env.PORT || config.port), function() {
    console.log("App listening on port", config.port);
  });

  module.exports = app;
};