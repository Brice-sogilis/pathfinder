import React from 'react';

function arrayBuilder(n) {
    return Array(n).fill()
}

function matrix2D(height, width, fillWith) {
    return arrayBuilder(height).map((_,i) => {return arrayBuilder(width).map((__, j) => {return fillWith(i,j)})});
}

function maxtrixCopy(mat, height, width) {
    return matrix2D(height, width, (i,j) => {return mat[i][j]})
}

const TileType = {
    BLOCKED: '#',
    FREE: '*',
    PATH: 'O',
}

const SelectionMode = {
    BLOCK: "BLOCK",
    PATH: "PATH",
}

class Square extends React.Component {
    getColor() {
        switch(this.props.type) {
            case TileType.BLOCKED:
                return '#000';
            case TileType.FREE:
                return '#FFF';
            case TileType.PATH:
                return "#AFA";
            default:
                return '#F00'
        }
    }

    render() {
        return (
            <button 
                className="square" 
                onClick={this.props.onClick}
                style={{'backgroundColor':this.getColor()}}
                placeholder={this.props.type}
            >
                
            </button>
        );
    }
}

class Grid extends React.Component {
    renderSquare(i, j) {
        return (
            <Square
                key={"tile_"+i+"_"+j}
                type={this.props.grid[i][j]}
                onClick={() => this.props.onClick(i,j)}
            />
          );
    }

    renderRow(i) {
        return (
            <div className="grid-row" key={"row_"+i}>
                {arrayBuilder(this.props.width).map((_,j) => {return this.renderSquare(i,j)})}
            </div>
        )
    }

    render() {
        return (
            <div className="grid">
                {arrayBuilder(this.props.height).map((_,i) => {return this.renderRow(i)})}
            </div>
        );
    }
}

class ToggleButton extends React.Component {
    getColor() {
        return this.props.selected ? "#5F5" : "#F55"
    }
    getText() {
        return (this.props.selected) ? this.props.whenOn : this.props.whenOff
    }
    render() {
        return ( 
            <button 
                selected={this.props.selected}
                onClick={this.props.onClick}
                placeholder="block-toggle"
                style={{backgroundColor:this.getColor()}}
            >
            {this.getText()}
            </button>
        );
    }
}

class PathFinder extends React.Component {
    defaultSelectionMode = SelectionMode.BLOCK;
    defaultTileType = TileType.FREE
    constructor(props) {
        super(props);
        this.state = {
            mode: this.defaultSelectionMode,
            height: this.props.height,
            width: this.props.width,
            grid: this.defaultGrid(this.props.height, this.props.width),
            selection: arrayBuilder(0),
        };
    }

    defaultGrid(height, width) {
        return matrix2D(height, width, () => {return this.defaultTileType});
    }

    switchBlock(i,j) {
        const prev = this.state.grid[i][j];
        const gridCopy = maxtrixCopy(this.state.grid, this.state.height, this.state.width);
        gridCopy[i][j] = (prev === TileType.BLOCKED)?TileType.FREE:TileType.BLOCKED
        this.setState({grid:gridCopy});
    }

    handleTileClick(i,j){
        switch(this.state.mode) {
            case SelectionMode.BLOCK:
                this.switchBlock(i,j);
                break;
            case SelectionMode.PATH:
                this.addToSelection(i,j);
                break;
            default:
                break;
                
        }
    }

    switchSelectionMode() {
        const newMode = (this.state.mode === SelectionMode.BLOCK) ? SelectionMode.PATH : SelectionMode.BLOCK;
        this.setState({mode:newMode});
    }

    addToSelection(i,j) {
        if(this.state.grid[i][j] === TileType.BLOCKED)return;
        const selectionCopy = this.state.selection.map((e,_) => {return e});
        const gridCopy = maxtrixCopy(this.state.grid, this.state.height, this.state.width);
        gridCopy[i][j] = TileType.PATH;
        selectionCopy.push((i,j));
        this.setState({selection:selectionCopy, grid:gridCopy});
    }

    render() {
        return (
            <>
            <Grid 
                grid={this.state.grid} 
                height={this.state.height} 
                width={this.state.width} 
                onClick={(i,j) => {this.handleTileClick(i,j)}}
            />
            <ToggleButton
                selected={this.state.mode === SelectionMode.BLOCK}
                onClick={() => {this.switchSelectionMode()}}
                whenOn="Block Mode"
                whenOff="Path Mode"
            />
            </>
        );
    }

}

export {PathFinder, TileType, SelectionMode, Grid, Square};