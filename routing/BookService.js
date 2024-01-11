let express = require('express')
require('../db')
let BookService = require('../model/Bser')


let BookRouter = express.Router();

BookRouter.get('/', async (req, res) => {
    let bs = await BookService.find();
    if (bs.length > 0) {
        res.send(bs)
    }
    else {
        res.send('no data found')
    }
})

BookRouter.post('/', async (req, res) => {
    let bs = new BookService(req.body)
    let result = await bs.save();
    res.send(result)
})

BookRouter.put('/:id', async (req, res) => {
    let bs = await BookService.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send(bs)
})

BookRouter.get('/search/:key', async (req, res) => {
    let bs = await BookService.find({
        $or: [
            { serviceName: { $regex: req.params.key } },
            { customerName: { $regex: req.params.key } },
            { email: { $regex: req.params.key } },
            { address: { $regex: req.params.key } }
        ]
    })
    res.send(bs)
})


module.exports = BookRouter;