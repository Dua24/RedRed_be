const mongoose = require('mongoose')
const replySchema = new mongoose.Schema(
    {
        reply_detail: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reply"
        }
    },
    { timeStamps: true }
);

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply