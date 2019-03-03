const mongoose = require('mongoose'),
      crypto = require('crypto'),
      jwt = require('jsonwebtoken'),
      config = require('../configs/config');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, config.secret); // STORE SECRET PHRASE SOMEWHERE ELSE LATER
}

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT()
    };
}

const User = mongoose.model('User', UserSchema);

module.exports = User;