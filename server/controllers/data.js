const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

module.exports = {

    testApi: (req, res) => {
        CoinGeckoClient.global().then(data => {
            return res.json({ response: data['data'] })
            // return res.json({ marketCap: data['data']['active_cryptocurrencies'] })
            // return res.json({ marketCap: data['data'].active_cryptocurrencies })
            // return res.json({ marketCap: data['data.active_cryptocurrencies'] })

            // active_cryptocurrencies
        })
    },
    secondApiTest: (req, res) => {
        CoinGeckoClient.coins.all().then(data => {
            // console.log(data)
            // return res.json({ response: data})
            return res.json({ response: data['data']})
            // return res.json({ response: data['message'] })
        })
    }
}