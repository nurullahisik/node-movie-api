const mongoose  = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie:movie11@ds231725.mlab.com:31725/heroku_8x3n7bzr', { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('open', () => {
        console.log("mongodb connected");
    });

    mongoose.connection.on('error', (err) => {
        console.log("mongodb error ", err);
    });

    // promise kullanımı icin(then, catch yapısı)
    mongoose.Promise = global.Promise;
}