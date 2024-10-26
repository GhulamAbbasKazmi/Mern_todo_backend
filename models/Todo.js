

// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true,
    },
}, 
{
    timestamps: true,
});

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;
