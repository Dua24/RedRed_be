const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        email: String,
        name: String,
        image: String,
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reply"
            }
        ],
        Online: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User