const mongoose = require("mongoose"),
      config = require("../configs/config");

const Schema = mongoose.Schema;

const GeolocationSchema = new Schema ({
    WOE_ID: {type: Number, required: true, unique: true},
    ISO: String,
    Name: String,
    Languange: String,
    PlaceType: String,
    Parent_ID: Number
});


const Geolocation = mongoose.model("Geolocation", GeolocationSchema);

module.exports = Geolocation;