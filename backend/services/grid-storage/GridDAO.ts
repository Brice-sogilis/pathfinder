class GridDAO {
    name: string;
    lines: Array<string>;
    height: number;
    width: number;

    constructor(name: string, lines: Array<string>) {
        this.name = name;
        this.lines = lines;
        this.height = lines.length;
        this.width = (this.height > 0) ? lines[0].length : 0
    }
}

interface GridCRUDRepository {
    getGridByName(name: string): Promise<GridDAO | null>;

    listGrids(): Promise<Array<GridDAO>>;

    createGrid(grid: GridDAO): Promise<boolean>;

    deleteGridByName(name: string): Promise<boolean>;

    deleteAll(): Promise<boolean>

}

export {GridDAO, GridCRUDRepository}