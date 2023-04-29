const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema(
    {
        message: String,
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reciever_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatRoom"
        },
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message