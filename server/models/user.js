const mongoose = require('mongoose');
const bycrpt = require('bcryptjs');


const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String, 
    password: String
});

userSchema.methods.generateHash = function(password) {
    try {
        return bycrpt.hashSync(password, bycrpt.genSaltSync(9));
    }
    catch (err) {
        console.log(err);
    }
}

userSchema.methods.validatePassword = function(enteredPassword, password) {
    try {
        return bycrpt.compareSync(enteredPassword, password);
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = mongoose.model('user', userSchema, 'users');


