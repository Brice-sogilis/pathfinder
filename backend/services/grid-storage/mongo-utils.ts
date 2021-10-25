import {Collection, MongoClient} from 'mongodb';
import {GridDAO, GridCRUDRepository} from "./GridDAO";

async function connectGridDatabase(address: string = '127.0.0.1', port: number = 27017): Promise<MongoClient> {
    const url: string = `mongodb://root:example@${address}:${port}`
    const client = new MongoClient(url);
    return client.connect();
}

class MongoGridCRUDRepository implements GridCRUDRepository {
    client: MongoClient
    dbName = "grid-storage";
    collectionName = "grids";

    constructor(client: MongoClient) {
        this.client = client;
    }

    getCollection(): Collection<GridDAO> {
        return this.client.db(this.dbName).collection(this.collectionName);
    }

    async getGridByName(name: string): Promise<GridDAO | null> {
        return await this.getCollection().findOne({name: name});
    }

    async listGrids(): Promise<GridDAO[]> {
        const res: Array<GridDAO> = [];
        await this.getCollection().find({}).forEach(function (g) {
            res.push(g);
        });
        return res;
    }

    async createGrid(grid: GridDAO): Promise<boolean> {
        const res = await this.getCollection().insertOne(grid);
        return res.acknowledged;
    }

    async deleteGridByName(name: string): Promise<boolean> {
        const res = await this.getCollection().deleteOne({name: name});
        return res.acknowledged && (res.deletedCount === 1);
    }

    async deleteAll(): Promise<boolean> {
        return (await this.getCollection().deleteMany({})).acknowledged;
    }
}

export {connectGridDatabase, MongoGridCRUDRepository}