import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    userName: String,
    creator: String,
    tags: [String],
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: { type: Date, default: new Date() },
})

var Post= mongoose.model('Posts', postSchema);

export default Post;