const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        maxlength: 60,
        min: 2
    },
    surname: {
        type: String,
        maxlength: 60,
        min: 2
    },
    bio: {
        type: String,
        maxlength: 2000,
        minlength: 60
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Director', DirectorSchema);

