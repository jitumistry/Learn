let mongoose = require('mongoose')
let BookServiceSchema = new mongoose.Schema({
    serviceName:String,
    customerName: String,
    email: String,
    phone:Number,
    address:String,
    status: String
})

module.exports = mongoose.model('BookService', BookServiceSchema)