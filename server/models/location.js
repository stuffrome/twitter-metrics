const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema ({
    woe_id: Number,
    name: String,
    country: String,
    place_type: String,
    parent_id: Number
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;