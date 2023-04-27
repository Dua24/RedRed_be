const Post = require("../models/Post")
const Rating = require("../models/Rating")

const rateAPost = async (req, res) => {
    const result = await Rating.findOne({
        $and: [
            { owner: req.body.owner },
            { post: req.body.post }
        ]
    })
    if (result) {
        if (req.body.type !== result.type) {
            const post = await Post.findOne({ _id: req.body.post })
            await Rating.updateOne({ _id: result._id }, { type: req.body.type })
            if (req.body.type === 'like') {
                await Post.updateOne({ _id: post._id }, { num_Evaluate: post.num_Evaluate + 2 })
            } else {
                await Post.updateOne({ _id: post._id }, { num_Evaluate: post.num_Evaluate - 2 })
            }
            return res.status(200).json({
                EC: 0,
                DT: `${req.body.type} success`
            })
        } else {
            return res.status(200).json({
                EC: 1,
                DT: `You rated ${req.body.type} yet...`
            })
        }
    } else {
        const r1 = await Rating.create(req.body)
        const post = await Post.findOne({ _id: req.body.post })
        if (req.body.type === 'like') {
            await Post.updateOne({ _id: req.body.post }, { num_Evaluate: post.num_Evaluate + 1 })
        } else {
            await Post.updateOne({ _id: req.body.post }, { num_Evaluate: post.num_Evaluate - 1 })
        }
        return res.status(200).json({
            EC: 0,
            DT: r1
        })
    }
}

const getAllRateOfUser = async (req, res) => {
    const result = await Rating.find({ owner: req.body.id })
    return res.status(200).json({
        EC: 0,
        DT: result
    })
}

module.exports = { rateAPost, getAllRateOfUser }