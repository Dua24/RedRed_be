const User = require("../models/User");

const getAllUsers = async (req, res) => {
    const result = await User.find({});
    res.status(200).json({
        errorCode: 0,
        result,
    })
}
const postUser = async (req, res) => {
    const result = await User.create({
        name: req.body.name,
    })
    res.status(200).json({
        errorCode: 0,
        result,
    })
}
const putUser = async (req, res) => {
    // const data = await User.updateOne({ _id: '6437f837e5ee1424df700427' }, { name: "update22" });
    const result = await User.findByIdAndUpdate("6437f837e5ee1424df700427", { name: "update" })
    res.status(200).json({
        errorCode: 0,
        result
    })
}


module.exports = { getAllUsers, postUser, putUser }