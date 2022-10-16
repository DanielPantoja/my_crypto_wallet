const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
<<<<<<< HEAD
require('dotenv').config()

mongoose.connect('mongodb+srv://Daniel:uvvmUirkdResPiEM@cluster0.yto1b.mongodb.net/my_crypto_wallet_db?retryWrites=true&w=majority' ,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to database sir")
})
.catch((err) => { 
    console.log(err)
    console.log("Connection to database failed")
});

=======
>>>>>>> 42941a0 (added controller and routes)
require('./routes')(app);
app.use('/', express.static( path.join(__dirname, '../../public/dist/public') ));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public/dist/public/index.html'));
});
// app.use('/', express.static( path.join(__dirname, '../../public/public') ));
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, '../../public/src/index.html'));
// });
module.exports = app;


// mongodb+srv://Daniel:<password>@cluster0.yto1b.mongodb.net/?retryWrites=true&w=majority