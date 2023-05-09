const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { laptopModel } = require("../Model/laptop.model");

const laptopRoute = express.Router();


// laptopRoute.use(auth)


laptopRoute.get("/", async (req, res) => {
    let { sort } = req.query;


    try {
        let data = null;
        if (sort) {
            if (sort == "des") {
                data = await laptopModel.find().sort({ price: -1 })
            } else {
                data = await laptopModel.find().sort({ price: 1 })
            }
        } else {
            data = await laptopModel.find();
        }



        res.send({ laptops: data })


    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})
laptopRoute.get("/:id", async (req, res) => {
    let id = req.params.id
    try {
        let art = await laptopModel.findById(id);
        res.send(art)
    } catch (error) {

    }
})
laptopRoute.post("/add", async (req, res) => {
    try {

        let data = new laptopModel(req.body);
        //console.log(data)
        data.save()
        res.status(200).send({ msg: "laptop Added" })
    } catch (error) {
        //console.log(error)

        res.status(400).send({ msg: error.message })
    }
})

laptopRoute.patch("/edit/:id", async (req, res) => {
    let id = req.params.id
    try {
        let art = await laptopModel.findById(id);
        if (art.userID == req.body.userID) {
            let data = await laptopModel.findByIdAndUpdate(id, req.body);
            res.send({ msg: "laptop updated" })
        } else {
            res.status(400).send({ msg: "you are not authorized to update the laptop" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
laptopRoute.delete("/rem/:id", async (req, res) => {
    let id = req.params.id
    try {
        let art = await laptopModel.findById(id);
        if (art.userID == req.body.userID) {
            let data = await laptopModel.findByIdAndDelete(id);
            res.send({ msg: "laptop deleted" })
        } else {
            res.status(400).send({ msg: "you are not authorized to delete the laptop" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
module.exports = {
    laptopRoute
}