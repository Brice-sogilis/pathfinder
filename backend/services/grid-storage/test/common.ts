import {GridCRUDRepository, GridDAO} from '../GridDAO'

const testGrid: GridDAO = new GridDAO("Test", ["ABC", "DEF", "GHI"]);

class MockGridCRUDRepository implements GridCRUDRepository {
    grids: Map<string, GridDAO>

    constructor() {
        this.grids = new Map<string, GridDAO>();
    }

    asPromise<T>(value: T): Promise<T> {
        return new Promise((res, _) => {
            res(value);
        })
    }

    getGridByName(name: string): Promise<GridDAO | null> {
        const res = this.grids.get(name);
        return this.asPromise((res) ? res : null);
    }

    listGrids(): Promise<GridDAO[]> {
        const res: Array<GridDAO> = [];
        this.grids.forEach((val, _) => {
            res.push(val);
        });
        return this.asPromise(res);
    }

    createGrid(grid: GridDAO): Promise<boolean> {
        this.grids.set(grid.name, grid);
        return this.asPromise(true);
    }

    deleteGridByName(name: string): Promise<boolean> {
        return this.asPromise(this.grids.delete(name));
    }

    deleteAll(): Promise<boolean> {
        this.grids.clear();
        return this.asPromise(true);
    }
}

function getMockAsPromise(): Promise<GridCRUDRepository> {
    return new Promise((res, _) => {
        res(new MockGridCRUDRepository())
    });
}

export {testGrid, MockGridCRUDRepository, getMockAsPromise}