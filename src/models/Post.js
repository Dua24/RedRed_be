const mongoose = require('mongoose')
const postSchema = new mongoose.Schema(
    {
        post_detail: String,
        type: String,
        num_Evaluate: Number,
        img_detail: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post