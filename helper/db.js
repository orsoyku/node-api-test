const mongoose = require('mongoose');

const dbConnection = mongoose.connect('mongodb://localhost/oyku', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo DB connection is success');
    })
    .catch((err) => {
        console.log(err);
    });
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
module.exports = dbConnection;