const express = require('express'),
      session = require('express-session'),
      cors = require('cors'),
      path = require('path'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      passport = require('passport');

const config = require('./configs/config');

module.exports.start = function() {
  // Mongoose database configuration
  require('./configs/database');

  // Passport configuration
  require('./configs/passport');

  // Initialize app
  const app = express();

  // Configure our app
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(session({ secret: config.secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

  // Initialize passport
  app.use(passport.initialize());

  // Get authentication routes
  const apiRoutes = require('./routes/api.routes');
  app.use('/api', apiRoutes);
  
  app.use('/', express.static('client/home'));
  app.use('/register', express.static('client/home/register'));

  app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
      res.redirect('/register');
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
    console.log('App listening on port', config.port);
  });
};