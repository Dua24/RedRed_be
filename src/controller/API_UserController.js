const Post = require("../models/Post");
const User = require("../models/User");
const { getFileUploaded, uploadSingleFile } = require("../service/uploadFileService");

const getAllUsers = async (req, res) => {
    const result = await User.find({});
    for (const e of result) {
        const imgBase64 = await getFileUploaded(e.image)
        e.image = imgBase64
    }
    res.status(200).json({
        errorCode: 0,
        result,
    })
}

const postUser = async (req, res) => {
    const file = req.files.image;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    let image = await uploadSingleFile(file)
    const data = {
        ...req.body,
        image
    }
    const result = await User.create(data)
    res.status(200).json({
        errorCode: 0,
        result,
    })
}
const getAUser = async (req, res) => {
    const result = await User.findOne({ _id: req.params.id }).populate("posts");
    res.status(200).json({
        errorCode: 0,
        result,
    })
}

const updateAUser = async (req, res) => {

    const result = await User.updateOne({ _id: req.params.id }, { ...req.body })
    res.status(200).json({
        errorCode: 0,
        result,
    })
}


module.exports = { getAllUsers, postUser, getAUser, updateAUser }