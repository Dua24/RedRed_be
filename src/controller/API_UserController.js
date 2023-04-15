const Post = require("../models/Post");
const User = require("../models/User");
const { getFileUploaded, uploadSingleFile } = require("../service/uploadFileService");

const getAllUsers = async (req, res) => {
    const result = await User.find({});
    for (const e of result) {
        const imgBase64 = await getFileUploaded(e.image, 'users')
        e.image = imgBase64
    }
    res.status(200).json({
        EC: 0,
        DT: result
    })
}

const postUser = async (req, res) => {
    let image
    if (req.files.image) {
        const file = req?.files?.image;
        image = await uploadSingleFile(file, 'users')
    }
    const data = {
        ...req.body,
        image
    }
    const result = await User.create(data)
    res.status(200).json({
        EC: 0,
        DT: result
    })
}
const getAUser = async (req, res) => {
    const result = await User.findOne({ _id: req.params.id }).populate("posts");
    res.status(200).json({
        EC: 0,
        DT: result
    })
}

const updateAUser = async (req, res) => {

    const result = await User.updateOne({ _id: req.params.id }, { ...req.body })
    res.status(200).json({
        EC: 0,
        DT: result
    })
}


module.exports = { getAllUsers, postUser, getAUser, updateAUser }