const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    },
    { timeStamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User