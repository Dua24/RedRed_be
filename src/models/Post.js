const mongoose = require('mongoose')
const postSchema = new mongoose.Schema(
    {
        post_detail: String,
        type: String,
        num_Evaluate: Number,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timeStamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post