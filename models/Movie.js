const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
       type: String,
       required: [true, '`{PATH}` alanı zorunludur.'],
       maxlength: [15, '{PATH} alanı {VALUE}, {MAXLENGTH} karakterden fazla olamaz.'],
       minlength: [2, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden az olamaz.']
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 2
    },
    country: String,
    year: {
        type: Number,
        max: 2020,
        min: 1900
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    director_id: Schema.Types.ObjectId,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Movie', MovieSchema);
