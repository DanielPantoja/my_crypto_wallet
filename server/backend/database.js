const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
    "mongodb+srv://Daniel:<cnax5vblCAb6QQ36>@cluster0.yto1b.mongodb.net/cryptoWalletDb?retryWrites=true&w=majority"
    )
    .then(client => {
    console.log("Connected to Database");
    _db = client.db()
    callback()
    })
    .catch(err => {
        console.log("There is an error")
        console.log(err);
    });
};
const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;