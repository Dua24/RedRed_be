const ChatRoom = require("../models/ChatRoom");
const createRoomChat = async (req, res) => {
    const isExistRoomChat = await ChatRoom.findOne({ participants: { $all: [req.body.participants[0], req.body.participants[1]] } })
    if (!isExistRoomChat) {
        const result = await ChatRoom.create(req.body)
        return res.status(200).json({
            EC: 0,
            DT: result
        })
    }
    return res.status(200).json({
        EC: 1,
        DT: {
            _id: isExistRoomChat._id
        }
    })

}

module.exports = { createRoomChat }