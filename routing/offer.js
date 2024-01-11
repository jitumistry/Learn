let express = require('express');
require('../db');
let offers = require('../model/Off');


let offRouter = express.Router();

offRouter.get('/', async (req, res) => {
    let offer = await offers.find();
    if (offer.length > 0) {
        res.send(offer)
    }
    else {
        res.send('no data found...')
    }
})

offRouter.post('/', async (req, res) => {
    let offer = new offers(req.body);
    let result = await offer.save();
    res.send(result);
})


offRouter.delete('/:_id', async (req, res) => {
    let offer = await offers.deleteOne(req.params);
    res.send(offer)
})

offRouter.get('/search/:key', async (req, res) => {
    let offer = await offers.find({
        $or: [
            { name: { $regex: req.params.key } },
            { description: { $regex: req.params.key } }
        ]
    })
    res.send(offer);
})

offRouter.get('/:id', async (req, res) => {
    let offer = await offers.findOne({ _id: req.params.id });
    res.send(offer)
})

offRouter.put('/:id', async (req, res) => {
    let offer = await offers.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send(offer)
})


module.exports = offRouter;