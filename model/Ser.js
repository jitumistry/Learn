let mongoose = require('mongoose');
let serviceSchema = new mongoose.Schema({
    name : String,
    title: String,
    description:String
})

module.exports = mongoose.model("services",serviceSchema)