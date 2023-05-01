const express = require("express");

const todoRoute = express.Router();
const { auth } = require("../middleware/auth")

const { TodoModel } = require("../model/todo");


todoRoute.use(auth)

todoRoute.post("/add", async (req, res) => {
    try {

        // Store hash in your password DB.
        await TodoModel.insertMany([req.body]);
        res.send({ msg: "Todo Added" })

    } catch (error) {
        console.log(error)
        res.send({ err: error })
    }
});

todoRoute.get("/", async (req, res) => {

    try {
        let data = await TodoModel.find({ userID: req.body.userID });
        //console.log(data)
        res.send({ "todo": data })

    } catch (error) {
        res.send({ err: error.message })
    }
});

todoRoute.patch("/update/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = await TodoModel.findById(id);
        let status = !data.status
        // Store hash in your password DB.
        await TodoModel.findByIdAndUpdate(id, { status: status });
        res.send({ msg: "Todo updated" })

    } catch (error) {
        console.log(error)
        res.send({ err: error })
    }
});
todoRoute.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;

        // Store hash in your password DB.
        await TodoModel.findByIdAndDelete(id);
        res.send({ msg: "Todo deleted" })

    } catch (error) {
        console.log(error)
        res.send({ err: error })
    }
});



module.exports = { todoRoute }