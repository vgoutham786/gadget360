const mongoose = require("mongoose");


const laptopSchema = mongoose.Schema({

    "brand": String,
    "model": String,
    "processor": String,
    "graphics": String,
    "memory": String,
    "storage": String,
    "display_size": String, "display_resolution": String, "battery_life": String,
    "weight": String,
    "operating_system": String,
    "price": String,
    "rating": String,
    "reviews": String,
    "warranty": String,
    "image": String

})



const laptopModel = mongoose.model("laptops", laptopSchema)

module.exports = {
    laptopModel
}