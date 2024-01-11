let mongoose = require('mongoose');
let testimonialSchema = new mongoose.Schema({
    testimonial: String,
    description: String
})

module.exports = mongoose.model('testimonials', testimonialSchema)