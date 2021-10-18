import http from 'http';
import express from 'express';
import cors from 'cors';
import {connectGridDatabase} from './mongo-utils';
import {MongoGridCRUDRepository} from './GridDAO'

let DB_HOSTNAME = process.env.DB_HOSTNAME
let DB_PORT = (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) : 27017
let mongoClient = connectGridDatabase(DB_HOSTNAME, DB_PORT);
let repository : MongoGridCRUDRepository | null = null;

let app = express();
app.use(express.json());
app.use(cors());
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

app.get("/grid/:name", async function (req, res) {
    res.status(200).send(await(await getRepository()).getGridByName(req.params.name));
});

app.delete("/grid/:name", async function name(req, res) {
    const present = await (await getRepository()).deleteGridByName(req.params.name);
    res.sendStatus((present)?200:404);
});

app.post("/grid", async function(req, res) {
    await (await getRepository()).createGrid(req.body);
    res.sendStatus(201);
});

app.listen(8888);
export {app}