const Comment = require("../models/Comment");
const Post = require("../models/Post");
const Reply = require("../models/Reply");
const User = require("../models/User");

const postAReply = async (req, res) => {
    const result = await Reply.create(req.body)
    await User.updateOne({ _id: req.body.owner }, { $push: { replies: result._id } })
    await Comment.updateOne({ _id: req.body.comment }, { $push: { replies: result._id } })
    res.status(200).json({
        EC: 0,
        DT: result
    })
}

const deleteReply = async (req, res) => {
    const result = await Reply.deleteOne({ _id: req.body.id })
    await Comment.updateMany({ replies: req.body.id }, { $pull: { replies: req.body.id } })
    await User.updateMany({ replies: req.body.id }, { $pull: { replies: req.body.id } })
    return res.status(200).json({
        EC: 0,
        DT: result
    })
}
module.exports = { postAReply, deleteReply }