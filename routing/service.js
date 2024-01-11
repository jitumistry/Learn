let express = require('express');
require('../db');
let services = require('../model/Ser');


let serRouter = express.Router();

serRouter.get('/', async (req, res) => {
    let service = await services.find();
    if (service.length > 0) {
        res.send(service);
    }
    else {
        res.send('no data found');
    }
})

serRouter.get('/data', async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const limitdata = await services.find();
        res.send(limitdata.slice(offset, offset + limit));
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

serRouter.post('/', async (req, res) => {
    let service = new services(req.body);
    let result = await service.save();
    res.send(result);
})

serRouter.delete('/:_id', async (req, res) => {
    let service = await services.deleteOne(req.params);
    res.send(service);
})

serRouter.get('/:id', async (req, res) => {
    let service = await services.findOne({ _id: req.params.id });
    res.send(service);
})

serRouter.put('/:id', async (req, res) => {
    let service = await services.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send(service);
})

serRouter.get('/search/:key', async (req, res) => {
    let service = await services.find({
        $or: [
            { name: { $regex: req.params.key } },
            { title: { $regex: req.params.key } },
            { description: { $regex: req.params.key } }
        ]
    })
    res.send(service);
})



module.exports = serRouter;