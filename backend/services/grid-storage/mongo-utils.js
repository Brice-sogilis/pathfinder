const MongoClient = require('mongodb').MongoClient

async function connectGridDatabase(port = 27017) {
    const url = 'mongodb://root:example@127.0.0.1:'+port;
    var client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return await client.connect();
}

module.exports.connectGridDatabase = connectGridDatabase