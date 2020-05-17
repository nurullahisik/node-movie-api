const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 2
    },
    surname: {
        type: String,
        required: true,
        maxlength: 60,
        min: 2
    },
    bio: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Director', DirectorSchema);
