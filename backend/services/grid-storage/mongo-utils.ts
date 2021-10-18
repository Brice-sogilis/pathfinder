import  {Collection, MongoClient} from 'mongodb'

async function connectGridDatabase(addr : string = '127.0.0.1', port : number = 27017) : Promise<MongoClient> {
    const url : string = `mongodb://root:example@${addr}:${port}`
    var client = new MongoClient(url);
    return client.connect();
}

function TODO(message : string = "TODO") : Error {
    return new Error(message);
}

class GridDAO {
    name: string;
    lines: Array<string>;
    height: number;
    width : number;
    constructor(name : string, lines: Array<string>) {
        this.name = name;
        this.lines = lines;
        this.height = lines.length;
        this.width = (this.height > 0)?lines[0].length:0
    }
}

interface GridCRUDRepository {
    getGridByName(name : string) : Promise<GridDAO | null>;
    listGrids() : Promise<Array<GridDAO>>;
    createGrid(grid : GridDAO) : Promise< boolean>;
    deleteGridByName(name : string) : Promise<boolean>;
    deleteAll() : Promise<Boolean>

}

class MongoGridCRUDRepository implements GridCRUDRepository {
    client : MongoClient
    dbName = "grid-storage";
    collectionName = "grids";

    constructor(client : MongoClient) {
        this.client = client;
    }

    getCollection() : Collection<GridDAO> {
        return this.client.db(this.dbName).collection(this.collectionName);
    }

    async getGridByName(name: string): Promise<GridDAO | null> {
        const res = await this.getCollection().findOne({name:name});
        return res;
    }

    async listGrids(): Promise<GridDAO[]> {
        const res :Array<GridDAO> = [];
        await this.getCollection().find({}).forEach(function(g) {
            res.push(g);
        });
        return res;
    }

    async createGrid(grid: GridDAO): Promise<boolean> {
        const res = await this.getCollection().insertOne(grid);
        return res.acknowledged;
    }

    async deleteGridByName(name: string): Promise<boolean> {
        const res = await this.getCollection().deleteOne({name:name});
        return res.acknowledged && (res.deletedCount === 1);
    }

    async deleteAll() : Promise<Boolean> {
        return (await this.getCollection().deleteMany({})).acknowledged;
    }
}

export {connectGridDatabase, GridDAO, GridCRUDRepository, MongoGridCRUDRepository}