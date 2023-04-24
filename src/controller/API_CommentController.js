const Comment = require("../models/Comment");
const Post = require("../models/Post");
const Reply = require("../models/Reply");
const User = require("../models/User");

const postComment = async (req, res) => {
    const result = await Comment.create(req.body)
    await User.updateOne({ _id: req.body.owner }, { $push: { comments: result._id } })
    await Post.updateOne({ _id: req.body.post }, { $push: { comments: result._id } })
    res.status(200).json({
        EC: 0,
        DT: result
    })
}
const getAComment = async (req, res) => {
    const result = await Comment.findOne({ _id: req.params.id })
        .populate("owner")
        .populate("post")
        .populate(
            {
                path: "replies",
                populate: {
                    path: 'owner',
                }
            }
        );

    res.status(200).json({
        EC: 0,
        DT: result
    })
}

const deleteComment = async (req, res) => {
    const result = await Comment.deleteOne({ _id: req.body.id })
    await Post.updateMany({ comments: req.body.id }, { $pull: { comments: req.body.id } })
    await User.updateMany({ comments: req.body.id }, { $pull: { comments: req.body.id } })
    const r1 = await Reply.find({ comment: req.body.id })
    await Reply.deleteOne({ comment: req.body.id })
    r1.forEach(async (e) => {
        await User.updateOne({ replies: e._id }, { $pull: { replies: e._id } })
    })


    return res.status(200).json({
        EC: 0,
        DT: result
    })
}

module.exports = { postComment, getAComment, deleteComment }