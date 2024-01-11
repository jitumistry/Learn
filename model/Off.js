let mongoose = require('mongoose');
let offerSchema = new mongoose.Schema({
    name: String,
    description: String
})

module.exports = mongoose.model('offers', offerSchema)