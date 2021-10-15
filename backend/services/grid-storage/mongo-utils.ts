import  {MongoClient} from 'mongodb'

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
    getGridByName(name : string) : GridDAO;
    listGrids() : Array<GridDAO>;
    createGrid(grid : GridDAO) : boolean;
    deleteGridByName(name : string) : boolean;

}

class MongoGridCRUDRepository implements GridCRUDRepository {
    client : MongoClient
    constructor(client : MongoClient) {
        this.client = client;
    }
    getGridByName(name: string): GridDAO {
        throw TODO();
    }
    listGrids(): GridDAO[] {
        throw TODO();
    }
    createGrid(grid: GridDAO): boolean {
        throw TODO();
    }
    deleteGridByName(name: string): boolean {
        throw TODO();
    }
}

export {connectGridDatabase, GridDAO, GridCRUDRepository, MongoGridCRUDRepository}