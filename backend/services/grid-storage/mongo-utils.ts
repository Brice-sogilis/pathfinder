import {MongoClient} from 'mongodb'

async function connectGridDatabase(address: string = '127.0.0.1', port: number = 27017): Promise<MongoClient> {
    const url: string = `mongodb://root:example@${address}:${port}`
    const client = new MongoClient(url);
    return client.connect();
}

export {connectGridDatabase}