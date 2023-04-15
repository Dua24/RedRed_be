const Post = require("../models/Post");
const User = require("../models/User");
const { uploadSingleFile, getFileUploaded } = require("../service/uploadFileService");
const postPost = async (req, res) => {
    let image = null
    if (req?.files?.img_detail) {
        const file = req?.files?.img_detail;
        image = await uploadSingleFile(file, 'posts')
    }
    const data = {
        ...req.body,
        img_detail: image
    }
    const result = await Post.create(data)
    if (req.body.owner) {
        await User.updateOne({ _id: req.body.owner }, { $push: { posts: result._id } })
    }
    res.status(200).json({
        EC: 0,
        DT: result
    })
}

const getAllPosts = async (req, res) => {
    const result = await Post.find({}).populate("owner");
    for (const e of result) {
        let imgBase64 = await getFileUploaded(e.img_detail, 'posts')
        e.img_detail = imgBase64
        img = await getFileUploaded(e.owner.image)
        e.owner.image = imgBase64

    }
    res.status(200).json({
        EC: 0,
        DT: result
    })
}
const getAPost = async (req, res) => {
    const result = await Post.findOne({ _id: req.params.id })
        .populate("owner")
        .populate(
            {
                path: "comments",
                populate: {
                    path: 'owner',
                }
            }
        );
    const imgBase64 = await getFileUploaded(result.img_detail, 'posts')
    result.img_detail = imgBase64
    res.status(200).json({
        EC: 0,
        DT: result
    })
}
const updateAPost = async (req, res) => {
    const result = await Post.updateOne({ _id: req.params.id }, { $set: req.body })
    res.status(200).json({
        EC: 0,
        DT: result
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
