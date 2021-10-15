import http from 'http';
import express from 'express';
import {MongoGridCRUDRepository, connectGridDatabase} from './mongo-utils';

const DB_HOSTNAME = process.env.DB_HOSTNAME
const DB_PORT = (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) : 27017
const mongoClient = connectGridDatabase(DB_HOSTNAME, DB_PORT);
var repository : MongoGridCRUDRepository | null = null;

var app = express();
app.use(express.json());

async function getRepository() : Promise<MongoGridCRUDRepository> {
    if(repository !== null) return repository;
    else {
        repository = new MongoGridCRUDRepository(await mongoClient);
        return repository;
    }
}

app.get("/health", function(req, res) {
    res.sendStatus(200);
});

app.get("/grid", async function(req, res) {
    res.status(200).send(await (await getRepository()).listGrids());
});

http.createServer(app).listen(8888);