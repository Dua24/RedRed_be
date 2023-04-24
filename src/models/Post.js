const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete');
const postSchema = new mongoose.Schema(
    {
        post_detail: String,
        type: String,
        num_Evaluate: Number,
        img_detail: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
    },
    { timestamps: true }
);
postSchema.plugin(mongoose_delete);
const Post = mongoose.model('Post', postSchema);

module.exports = Post