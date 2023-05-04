const Account = require("../models/Account");
const Post = require("../models/Post");
const User = require("../models/User");
const { getFileUploaded, uploadSingleFile, convertFile2Base64 } = require("../service/uploadFileService");

const getAllUsers = async (req, res) => {
    const result = await User.find({});
    res.status(200).json({
        EC: 0,
        DT: result
    })
}

const postUser = async (req, res) => {
    let imgBase64
    if (req.files.image) {
        imgBase64 = convertFile2Base64(req.files.image)
    } else {
        return res.send("no File uploaded")
    }
    const data = {
        ...req.body,
        image: imgBase64
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
    let data = {}
    data = {
        ...req.body,
        image: req.body.image || convertFile2Base64(req.files.image)
    }
    const result = await User.updateOne({ _id: req.body.id }, data)
    await Account.updateOne({ _id: req.body.id }, { username: req.body.name, image: data.image })
    res.status(200).json({
        EC: 0,
        DT: result
    })
}


module.exports = { getAllUsers, postUser, getAUser, updateAUser }