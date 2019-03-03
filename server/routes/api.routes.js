const express = require('express'),
      router = express.Router(),
      jwt = require('express-jwt');

const config = require('../configs/config'),
      authController = require('../controllers/auth.controller'),
      dashboardController = require('../controllers/dashboard.controller');

const requireLogin = jwt({
  secret: config.secret,
  userProperty: 'payload'
});

// Authentication
router.post('/register', authController.register);
router.post('/login', authController.login);

// Dashboard
router.get('/dashboard', requireLogin, )

module.exports = router;