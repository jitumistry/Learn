let express = require('express');
require('../db');
let testimonials = require('../model/tes');

let tesRouter = express.Router();

tesRouter.get('/', async (req, res) => {
    let user = await testimonials.find();
    if (user.length > 0) {
        res.send(user)
    }
    else {
        res.send('no data found...')
    }
})


tesRouter.post('/', async (req, res) => {
    let user = new testimonials(req.body);
    let result = await user.save();
    res.send(result)
})


tesRouter.delete('/:id', async (req, res) => {
    let user = await testimonials.deleteOne({ _id: req.params.id })
    res.send(user)
})


tesRouter.get('/search/:key', async (req, res) => {
    let user = await testimonials.find({
        $or: [
            { testimonial: { $regex: req.params.key } },
            { description: { $regex: req.params.key } }
        ]
    })
    res.send(user)
})


tesRouter.get('/:id', async (req, res) => {
    let user = await testimonials.findOne({ _id: req.params.id })
    res.send(user)
})


tesRouter.put('/:id', async (req, res) => {
    let user = await testimonials.updateOne({ _id: req.params.id }, { $set: req.body })
    res.send(user)
})



module.exports = tesRouter;