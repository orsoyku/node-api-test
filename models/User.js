const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        maxlength: 15,
        minlength: 2,
        required: true,
        unique: true
    },
    password: {
        type: String,
        maxlength: 60,
        minlength: 5
    }

});



module.exports = mongoose.model('User', UserSchema)

