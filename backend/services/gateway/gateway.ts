import express, { Application } from 'express';
import cors from 'cors';
import {GridStoreClient} from "../grid-storage/pb/grid_grpc_pb"
import {GridCRUDRepository} from "../grid-storage/GridDAO"
class Gateway {
    app: Application
    repositoryAccess: Promise<GridCRUDRepository>
    constructor(repositoryAccess : Promise<GridCRUDRepository>) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
        this.repositoryAccess = repositoryAccess;
        this.configRoutes();
    }

    configRoutes(){
        this.app.get("/health", function(req, res) {
            res.sendStatus(200);
        });
        
        this.app.get("/grid", async (req, res) => {
            res.status(200).send(await (await this.repositoryAccess).listGrids());
        });
        
        this.app.get("/grid/:name", async (req, res) => {
            res.status(200).send(await(await this.repositoryAccess).getGridByName(req.params.name));
        });
        
        this.app.delete("/grid/:name", async (req, res) => {
            const present = await (await this.repositoryAccess).deleteGridByName(req.params.name);
            res.sendStatus((present)?200:404);
        });
        
        this.app.post("/grid", async (req, res) => {
            await (await this.repositoryAccess).createGrid(req.body);
            res.sendStatus(201);
        });
    }

    listen(port : number) {
        return this.app.listen(port);
    }
}
export {Gateway}