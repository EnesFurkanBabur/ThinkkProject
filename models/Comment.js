// models/Comment.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Comment', commentSchema);
