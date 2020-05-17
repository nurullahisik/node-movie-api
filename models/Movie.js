const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
       type: String,
       required: true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    director_id: Schema.Types.ObjectId,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Movie', MovieSchema);
