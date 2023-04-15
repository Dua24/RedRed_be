const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema(
    {
        cmt_detail: String,
        num_Evaluate: Number,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reply"
            }
        ]
    },
    { timeStamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment