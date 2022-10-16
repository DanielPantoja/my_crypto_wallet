const data = require('../controllers/data');

module.exports = (app) => {
    app.get('/api/test', (req, res) => data.testApi(req, res));
    app.get('/api/test/2', (req, res) => data.secondApiTest(req, res));
}