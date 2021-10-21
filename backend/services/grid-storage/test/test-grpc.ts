import chai from 'chai'
import chai_as_promised from 'chai-as-promised';
import * as messages from "../pb/grid_pb";
import * as services from "../pb/grid_grpc_pb";
import * as grpc from "@grpc/grpc-js";
import {clear, testGrid} from './test-database'
const expect = chai.expect;
chai.use(chai_as_promised);
let should = chai.should();

describe('Connection to GRPC server', function() {
    it('Should create a client without error', function() {
        var client: services.GridStoreClient = new services.GridStoreClient(
            "localhost:9999",
            grpc.credentials.createInsecure()
          );
    });
});
