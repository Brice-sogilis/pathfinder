import {GridCRUDRepository, GridDAO} from '../GridDAO'

const testGrid: GridDAO = new GridDAO("Test", ["ABC", "DEF", "GHI"]);

function asPromise<T>(value : T): Promise<T> {
    return new Promise((res, _) => {
        res(value);
    });
}

class MockGridCRUDRepository implements GridCRUDRepository {
    grids: Map<string, GridDAO>

    constructor() {
        this.grids = new Map<string, GridDAO>();
    }

    getGridByName(name: string): Promise<GridDAO | null> {
        const res = this.grids.get(name);
        return asPromise((res) ? res : null);
    }

    listGrids(): Promise<GridDAO[]> {
        const res: Array<GridDAO> = [];
        this.grids.forEach((val, _) => {
            res.push(val);
        });
        return asPromise(res);
    }

    createGrid(grid: GridDAO): Promise<boolean> {
        this.grids.set(grid.name, grid);
        return asPromise(true);
    }

    deleteGridByName(name: string): Promise<boolean> {
        return asPromise(this.grids.delete(name));
    }

    deleteAll(): Promise<boolean> {
        this.grids.clear();
        return asPromise(true);
    }
}

function getMockRepositoryAsPromise(): Promise<GridCRUDRepository> {
    return asPromise(new MockGridCRUDRepository());
}

export {testGrid, MockGridCRUDRepository, getMockRepositoryAsPromise, asPromise}