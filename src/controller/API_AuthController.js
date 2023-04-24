const Account = require("../models/Account");
const User = require("../models/User");
const md5 = require('md5');
const register = async (req, res) => {
    let result
    result = await Account.findOne({
        $or: [
            { email: req.body.email },
            { username: req.body.username }
        ]
    })
    if (result) {
        let msg
        if (result.email.localeCompare(req.body.email) === 0) {
            msg = "Email is already exists"
        } else if (result.username.localeCompare(req.body.username) === 0) {
            msg = "Username is already exists"
        }
        return res.status(200).json({
            EC: 1,
            DT: msg
        })
    } else {
        const data = {
            ...req.body,
            password: req.body.password,
            image: ''
        }
        result = await Account.create(data)
        await User.create({
            _id: result._id,
            email: req.body.email,
            name: req.body.username,
            image: '',
            posts: [],
            comments: [],
            replies: [],
            createdAt: new Date(), updatedAt: new Date()
        })
        return res.status(200).json({
            EC: 0,
            DT: result
        })
    }
}


const checkEmailExist = async (req, res) => {
    let result
    result = await Account.findOne({ email: req.body.email })
    if (result) {
        return res.status(200).json({
            EC: 1,
            DT: "Email is already exist"
        })
    } else {
        return res.status(200).json({
            EC: 0,
            DT: "Email is valid"
        })
    }
}

const login = async (req, res) => {
    const result = await Account.findOne({ email: req.body.email })
    if (result) {
        if (result.password.localeCompare(req.body.password) === 0) {
            result.password = "**************"
            await User.updateOne({ email: req.body.email }, { Online: true })
            return res.status(200).json({
                EC: 0,
                DT: result
            })
        } else {
            return res.status(200).json({
                EC: 1,
                DT: "Incorrect password"
            })
        }
    } else {
        return res.status(200).json({
            EC: 1,
            DT: "Email does not exists"
        })
    }
}

const logout = async (req, res) => {
    const result = await Account.findOne({ email: req.body.email })
    if (result) {
        await User.updateOne({ email: req.body.email }, { Online: false })
        return res.status(200).json({
            EC: 0,
            DT: result
        })
    } else {
        return res.status(200).json({
            EC: 1,
            DT: "Co loi"
        })
    }
}

module.exports = { register, login, checkEmailExist, logout }