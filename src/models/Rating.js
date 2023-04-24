const mongoose = require('mongoose')
const ratingSchema = new mongoose.Schema(
    {
        type: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    { timestamps: true }
);

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating