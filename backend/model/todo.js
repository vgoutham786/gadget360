const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: String,
    status: { type: Boolean, default: false },
    userID: String

})

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel }