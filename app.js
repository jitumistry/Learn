let express = require('express');
require('./db');
let serRouter = require('./routing/service')
const offRouter = require('./routing/offer');
const tesRouter = require('./routing/testimonial');
const BookRouter = require('./routing/BookService')
let cors = require('cors');

let app = express();
app.use(cors());
app.use(express.json());

app.use('/service', serRouter);

app.use('/offer', offRouter);

app.use('/testimonial', tesRouter);

app.use('/BookService', BookRouter);

app.listen(4000, (req, res) => {
    console.log('server running in port 4000');
});