const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` is required.'],
        maxlength: [15, '`{PATH}` (`{VALUE}`) is shorter than the minimum allowed length'],
        minlength: 1
    },
    category: String,
    //enum: ['Horror', 'Comediy'], default: 'horror'
    country: String,
    year: {
        type: Number,
        max: 2040,
        min: 1800
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0

    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Movie', MovieSchema)

