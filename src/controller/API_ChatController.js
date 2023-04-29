const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
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


const postMessage = async (req, res) => {
    const result = await Message.create(req.body)
    await ChatRoom.updateOne({ _id: req.body.room }, { $push: { messages: result._id } })
    if (result) {
        return res.status(200).json({
            EC: 0,
            DT: result
        })
    }
    return res.status(200).json({
        EC: 1,
        DT: 'Something wrong'
    })
}

const getAllMsgOfRoom = async (req, res) => {
    const result = await Message.find({ room: req.params.room })
    console.log(">>> ", result)
    if (result) {
        return res.status(200).json({
            EC: 0,
            DT: result
        })
    }
    return res.status(200).json({
        EC: 1,
        DT: 'Something wrong'
    })
}

module.exports = { createRoomChat, postMessage, getAllMsgOfRoom }