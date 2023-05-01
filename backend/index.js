const express = require("express");
const { userRoute } = require("./route/user.route");
const { todoRoute } = require("./route/todo.route");
const { connectToDb } = require("./db");
require('dotenv').config();
const cors = require("cors")
const app = express();
app.use(express.json());

app.use(cors())
app.use("/user", userRoute)
app.use("/todo", todoRoute)

app.listen(process.env.port, async () => {
    try {
        await connectToDb;
        console.log("connected to db")

    } catch (error) {
        console.log(error)
    }
    console.log("connected to port")
}) 