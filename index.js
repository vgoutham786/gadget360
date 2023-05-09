const express = require("express");
const { connectToDb } = require("./db");
const { userRoute } = require("./Routes/user.route");
const { laptopRoute } = require("./Routes/laptop.route");

const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json());

//const port = process.argv[2];
//console.log(port)

app.use("/user", userRoute);
app.use("/laptops", laptopRoute);



app.listen(8080, async () => {
    try {
        await connectToDb
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("connected to port")
})
