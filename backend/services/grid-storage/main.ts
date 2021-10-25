import {connectGridDatabase, MongoGridCRUDRepository} from './mongo-utils';
import {GridStoreServiceImpl} from './service';

let DB_HOSTNAME = process.env.DB_HOSTNAME
let DB_PORT = (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) : 27017
let SERVICE_PORT = 9999;
let mongoClient = connectGridDatabase(DB_HOSTNAME, DB_PORT);
let repository: MongoGridCRUDRepository | null = null;

async function getRepository(): Promise<MongoGridCRUDRepository> {
    if (repository !== null) return repository;
    else {
        repository = new MongoGridCRUDRepository(await mongoClient);
        return repository;
    }
}

const service = new GridStoreServiceImpl(getRepository());
service.listen(SERVICE_PORT, () => {
    console.log(`Service started on port ${SERVICE_PORT}`);
});