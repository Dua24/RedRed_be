const Comment = require("../models/Comment");
const Post = require("../models/Post");
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

module.exports = { postComment, getAComment }