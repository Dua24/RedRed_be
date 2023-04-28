const mongoose = require('mongoose')
const chatroomSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message"
            }
        ]
    },
    { timestamps: true }
);

const ChatRoom = mongoose.model('ChatRoom', chatroomSchema);

module.exports = ChatRoom