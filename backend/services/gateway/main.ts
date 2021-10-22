import { Gateway } from "./gateway";
import { GridStoreClient } from "../grid-storage/pb/grid_grpc_pb";
import * as grpc from '@grpc/grpc-js';
import { GridRepositoryRPCWrapper } from "../grid-storage/service";
const SERVER_PORT = 8888;
function promisify<T>(value: T): Promise<T> {
    return new Promise((resolve, reject) => {
        resolve(value);
    });
}
var rpcClient = new GridStoreClient("server-grpc:9999", grpc.credentials.createInsecure());
var gateway = new Gateway(promisify(new GridRepositoryRPCWrapper(rpcClient)));
gateway.listen(SERVER_PORT);