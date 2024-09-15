const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
    {
        todo: {
            type: String,
            minLength: 3,
            maxLength: 20,
            required: true
        },
        isCompleted: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true,
        strict: false
    }
)

module.exports = mongoose.model('Todo', todoSchema) 