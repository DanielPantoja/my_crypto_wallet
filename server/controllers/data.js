const CoinGeckoClient = require('../backend/app');

module.exports = {
    // testApi: (req, res) => {
    //     return res.json({ message: 'this is the response feedback' })
    // },

    testApi: (req, res) => {
        // let data = await CoinGeckoClient.ping();
        // return res.json({message: data})

        // await CoinGeckoClient.ping().then(data => {
        //     return res.json({message: data})
        // })
        CoinGeckoClient.ping().then(data => {
            return res.json({res: data})
        })
        // let data = CoinGeckoClient.ping()
        // return res.json({res: data})
    }
}