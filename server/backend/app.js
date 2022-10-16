const express = require('express');
const bodyParser = require('body-parser');

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();


const app = express();
const path = require("path");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./routes')(app);
app.use('/', express.static( path.join(__dirname, '../../public/dist/public') ));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../../public/dist/public/index.html'));
});
// app.use('/', express.static( path.join(__dirname, '../../public/public') ));
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, '../../public/src/index.html'));
// });


// var func = async() => {
//     let data = await CoinGeckoClient.ping();
//     console.log(data)
//     return data;
//   };
// console.log('COIN GECKO', func)


module.exports = app;
