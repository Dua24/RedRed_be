const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema(
    {
        email: String,
        username: String,
        password: String,
        image: String,

    },
    { timestamps: true }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account