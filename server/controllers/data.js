const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

module.exports = {

    testApi: (req, res) => {
        CoinGeckoClient.ping().then(data => {
            return res.json({ response: data, testObject: 'this is the value of the test object' })
        })
    },
    secondApiTest: (req, res) => {
        CoinGeckoClient.coins.all().then(data => {
            return res.json({ response: data, testObject: 'this is the value of the test object' })
        })
    }
}