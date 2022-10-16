const data = require('../controllers/data');

module.exports = (app) => {
    app.get('/api/test', (req, res) => data.testApi(req, res));
    app.get('/api/test/2', (req, res) => data.secondApiTest(req, res));
    app.post('/api/login', (req, res) => data.login(req, res));
    app.post('/api/signup', (req, res) => data.signUp(req, res))
}