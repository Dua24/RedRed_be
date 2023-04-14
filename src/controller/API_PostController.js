const Post = require("../models/Post");
const User = require("../models/User");
const postPost = async (req, res) => {
    const data = {
        ...req.body,
    }
    const result = await Post.create(data)
    if (req.body.owner) {
        await User.updateOne({ _id: req.body.owner }, { $push: { posts: result._id } })
    }
    res.status(200).json({
        errorCode: 0,
        result,
    })
}

const getAllPosts = async (req, res) => {
    const result = await Post.find({});
    // for (const e of result) {
    //     const imgBase64 = await getFileUploaded(e.image)
    //     e.image = imgBase64
    // }
    res.status(200).json({
        errorCode: 0,
        result,
    })
}
const getAPost = async (req, res) => {
    const result = await Post.findOne({ _id: req.params.id }).populate("owner");
    res.status(200).json({
        errorCode: 0,
        result,
    })
}
const updateAPost = async (req, res) => {
    const result = await Post.updateOne({ _id: req.params.id }, { $set: req.body })
    res.status(200).json({
        errorCode: 0,
        result,
    })
}
// const postFile = async (req, res) => {
//     const file = req.files.file;
//     if (!file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     let result = await uploadSingleFile(file, res)
//     console.log("check result >>> ", result);
//     return res.json({ data: result });
// }


// const getFile = async (req, res) => {
//     let result = await getFileUploaded(req.body.fileName)
//     console.log("check result >>> ", result);
//     return res.json({ result })
// }

module.exports = { getAllPosts, postPost, getAPost, updateAPost }
