
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial 
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);


  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;

  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  new_listing = new Listing(req.body);

  Listing.findById(listing.id, function(err, listing) {
    if (err) throw err;
  
    listing.code = new_listing.code;
    listing.name = new_listing.name;
    listing.address = new_listing.address;
    listing.coordinates = new_listing.coordinates;

    listing.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(listing);
      }
    });
  
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /* Remove the article */
  Listing.deleteOne({_id: listing.id}, function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(200).send('Listing successfully deleted');
    }
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  Listing.find().sort({code: 'asc'}).exec(function(err, listings) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listings);
    }
  });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};