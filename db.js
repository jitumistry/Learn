let mongoose = require('mongoose');
require('dotenv').config()
let url = process.env.MY_DATABASE_KEY;
mongoose.connect(url);