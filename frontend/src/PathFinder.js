import React from "react";
import { LocatedNode, Graph } from "./Graph";
import { arrayBuilder, matrix2D, matrixCopy, foreach2D } from "./matrix";
const gridServiceHostname =
  process.env.GRID_HOSTNAME === undefined
    ? "localhost"
    : process.env.GRID_HOSTNAME;
const gridServiceBaseUrl = "http://" + gridServiceHostname + ":8888/grid";

//Enum representing a tile type
const TileType = {
  BLOCKED: "#",
  FREE: "*",
  PATH: "O",
};

//Enum representing the current behavior of a click
const SelectionMode = {
  BLOCK: "BLOCK",
  PATH: "PATH",
};

//Component representing a Tile
class Tile extends React.Component {
  getColor() {
    switch (this.props.type) {
      case TileType.BLOCKED:
        return "#000";
      case TileType.FREE:
        return "#FFF";
      case TileType.PATH:
        return "#AFA";
      default:
        return "#F00";
    }
  }

  render() {
    return (
      <button
        className="square"
        onClick={this.props.onClick}
        style={{ backgroundColor: this.getColor() }}
        placeholder={this.props.type}
      ></button>
    );
  }
}

//2D grid of component representing an underlying grid of character
class Grid extends React.Component {
  renderTile(i, j) {
    return (
      <Tile
        key={"tile_" + i + "_" + j}
        type={this.props.grid[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  //Return a line of tiles
  renderRow(i) {
    return (
      <div className="grid-row" key={"row_" + i}>
        {arrayBuilder(this.props.width).map((_, j) => {
          return this.renderTile(i, j);
        })}
      </div>
    );
  }

  //Multiple lines of tiles
  render() {
    return (
      <div className="grid">
        {arrayBuilder(this.props.height).map((_, i) => {
          return this.renderRow(i);
        })}
      </div>
    );
  }
}

//Two-mode button
class ToggleButton extends React.Component {
  getColor() {
    return this.props.selected ? "#5F5" : "#F55";
  }

  getText() {
    return this.props.selected ? this.props.whenOn : this.props.whenOff;
  }

  render() {
    return (
      <button
        selected={this.props.selected}
        onClick={this.props.onClick}
        placeholder="block-toggle"
        style={{ backgroundColor: this.getColor() }}
      >
        {this.getText()}
      </button>
    );
  }
}

class GridSaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Nomduturfu" };
  }

  //Save the current name in form
  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  //Propagate call to parent component
  handleSubmit(event) {
    this.props.onSubmit(this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form
          onChange={(e) => {
            this.handleChange(e);
          }}
        >
          <label>
            Name :
            <input type="text" name="name" />
          </label>
        </form>
        <button onClick={(e) => this.handleSubmit(e)} placeholder="grid-save">
          SAVE
        </button>
      </div>
    );
  }
}

class GridList extends React.Component {
  renderGridItem(index) {
    return (
      <button
        key={index}
        onClick={() => {
          this.props.onClick(this.props.grids[index].name);
        }}
      >
        {"#" + index + " " + this.props.grids[index].name}
      </button>
    );
  }

  render() {
    return (
      <ul>
        {arrayBuilder(this.props.grids.length).map((_, i) => {
          return this.renderGridItem(i);
        })}
      </ul>
    );
  }
}

class PathFinder extends React.Component {
  defaultSelectionMode = SelectionMode.BLOCK;
  defaultTileType = TileType.FREE;
  constructor(props) {
    super(props);
    this.state = {
      mode: this.defaultSelectionMode,
      height: this.props.height,
      width: this.props.width,
      grid: this.defaultGrid(this.props.height, this.props.width),
      selection: arrayBuilder(0),
      gridList: [{ name: "Maze" }, { name: "Dedale" }, { name: "Pan" }],
    };
  }

  //Retrieve all saved grids from the gri api and update component state
  fetchGridsAndUpdate() {
    fetch(gridServiceBaseUrl)
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        this.setState({ gridList: obj });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Send a post request to perist the current grid
  createGrid(name) {
    return fetch(gridServiceBaseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formatGrid(name)),
    })
      .then((_) => {
        this.fetchGridsAndUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //retrieve a saved grid based on it's name
  getGrid(name) {
    return fetch(gridServiceBaseUrl + "/" + name)
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        const newGrid = matrix2D(
          obj.lines.length,
          obj.lines[0].length,
          (i, j) => {
            return obj.lines[i][j];
          }
        );
        this.setState({ grid: newGrid, selection: [] });
      });
  }

  //Fetch initial grids at mount time
  componentDidMount() {
    this.fetchGridsAndUpdate();
  }

  //Convert internal state into a suitable grid for the grid api
  formatGrid(name) {
    const lines = [];
    var line = "";
    foreach2D(
      this.state.grid,
      this.state.height,
      this.state.width,
      (_, i, j) => {
        line += this.state.grid[i][j];
        if (j === this.state.width - 1) {
          lines.push(line);
          line = "";
        }
      }
    );
    return { name: name, lines: lines };
  }

  //Fill intial grid with empty tiles
  defaultGrid(height, width) {
    return matrix2D(height, width, () => {
      return this.defaultTileType;
    });
  }

  //Apply suitable rule depending on the current state of the component
  handleTileClick(i, j) {
    switch (this.state.mode) {
      case SelectionMode.BLOCK:
        this.handleBlockClick(i, j);
        break;
      case SelectionMode.PATH:
        this.handlePathClick(i, j);
        break;
      default:
        break;
    }
  }

  //Switch a blocked tile to free or vice versa
  handleBlockClick(i, j) {
    const prev = this.state.grid[i][j];
    const gridCopy = matrixCopy(
      this.state.grid,
      this.state.height,
      this.state.width
    );
    gridCopy[i][j] =
      prev === TileType.BLOCKED ? TileType.FREE : TileType.BLOCKED;
    this.setState({ grid: gridCopy });
  }

  /*
        Set the tile to PATH if it is not blocked. 
        If this is the first tile in selection, erase previous path tile. 
        If this is the second, draw a path between the two selected tiles and clear selection
    */
  handlePathClick(i, j) {
    if (this.state.grid[i][j] === TileType.BLOCKED) return;
    var selectionCopy = this.state.selection.map((e, _) => {
      return e;
    });
    const gridCopy = matrixCopy(
      this.state.grid,
      this.state.height,
      this.state.width
    );
    if (selectionCopy.length === 0) {
      this.clearMatchingTile(
        gridCopy,
        this.state.height,
        this.state.width,
        TileType.PATH
      ); //Erase previously drawn path from UI
    }
    gridCopy[i][j] = TileType.PATH;
    selectionCopy.push([i, j]);
    if (selectionCopy.length >= 2) {
      const [origin, destination] = [selectionCopy[0], selectionCopy[1]];
      this.applySelectionPath(gridCopy, origin, destination);
      selectionCopy = [];
    }
    this.setState({ selection: selectionCopy, grid: gridCopy });
  }

  //Switch from path to block mode and vice versa
  switchSelectionMode() {
    const newMode =
      this.state.mode === SelectionMode.BLOCK
        ? SelectionMode.PATH
        : SelectionMode.BLOCK;
    this.setState({ mode: newMode });
  }

  /* 
        Model the current grid as a graph to compute the shortest path between origin and destination
        If found, set each tile along the path to PATH
    */
  applySelectionPath(mutableGrid, origin, destination) {
    const nodeMatrix = matrix2D(
      this.state.height,
      this.state.width,
      (i, j) => new LocatedNode(this.state.grid[i][j], i, j)
    );
    const nodes = [];
    const [origin_i, origin_j] = origin;
    const [destination_i, destination_j] = destination;
    const originNode = nodeMatrix[origin_i][origin_j];
    const destinationNode = nodeMatrix[destination_i][destination_j];

    foreach2D(nodeMatrix, this.state.height, this.state.width, (n, _, __) => {
      nodes.push(n);
    });

    const graph = new Graph(nodes);

    foreach2D(nodeMatrix, this.state.height, this.state.width, (n, i, j) => {
      if (n.value === TileType.BLOCKED) return;

      if (i > 0 && mutableGrid[i - 1][j] !== TileType.BLOCKED) {
        graph.link(nodeMatrix[i - 1][j], n);
        graph.link(n, nodeMatrix[i - 1][j]);
      }

      if (j > 0 && mutableGrid[i][j - 1] !== TileType.BLOCKED) {
        graph.link(nodeMatrix[i][j - 1], n);
        graph.link(n, nodeMatrix[i][j - 1]);
      }
    });

    const path = graph.shortestPath(originNode, destinationNode);

    if (path !== null) {
      for (let node of path) {
        mutableGrid[node.i][node.j] = TileType.PATH;
      }
    }
  }

  //Replace all tile of a certain type by another type
  clearMatchingTile(
    matrix,
    height,
    width,
    tileType,
    replacement = TileType.FREE
  ) {
    foreach2D(matrix, height, width, (t, i, j) => {
      if (t === tileType) {
        matrix[i][j] = replacement;
      }
    });
  }

  render() {
    return (
      <>
        <Grid
          grid={this.state.grid}
          height={this.state.height}
          width={this.state.width}
          onClick={(i, j) => {
            this.handleTileClick(i, j);
          }}
        />
        <ToggleButton
          selected={this.state.mode === SelectionMode.BLOCK}
          onClick={() => {
            this.switchSelectionMode();
          }}
          whenOn="Block Mode"
          whenOff="Path Mode"
        />
        <GridList
          grids={this.state.gridList}
          onClick={(name) => {
            this.getGrid(name);
          }}
        />
        <GridSaveForm
          onSubmit={(name) => {
            this.createGrid(name).then(() => {
              console.log("Hey");
            });
          }}
        />
      </>
    );
  }
}

export { PathFinder, TileType, SelectionMode, Grid, Tile};
