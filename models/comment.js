import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = Schema({
    comment: {
        type: String, 
        require: true
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Post'
    }
    
},{timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;