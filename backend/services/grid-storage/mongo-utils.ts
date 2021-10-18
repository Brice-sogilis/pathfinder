import  {MongoClient} from 'mongodb'

async function connectGridDatabase(addr : string = '127.0.0.1', port : number = 27017) : Promise<MongoClient> {
    const url : string = `mongodb://root:example@${addr}:${port}`
    var client = new MongoClient(url);
    return client.connect();
}

export {connectGridDatabase}