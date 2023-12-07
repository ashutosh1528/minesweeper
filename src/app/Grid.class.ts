import { v4 as uuidv4 } from 'uuid';
let instance:Grid;

class Grid {
    private grid:Array<Array<{ number: number, isOpen: boolean, id: string }>> = [[]];
    private rows = 0;
    private columns = 0;
    private totalBombs = 0;
    constructor() {
        if (instance) return instance;
    }

    private fillbombs = () => {
        let temp = 0;
        while(temp !== this.totalBombs) {
            let x = Math.floor(Math.random() * this.rows);
            let y = Math.floor(Math.random() * this.columns);
            if (this.grid[x][y].number === 0) {
                const o = { ...this.grid[x][y]};
                o.number = -1;
                this.grid[x][y] = o;
                temp += 1;
            }
        }
    }

    private fillDigits = () => {
        for(let r = 0; r<this.rows; r+=1) {
            for(let c = 0; c<this.columns; c+=1) {
                // temp code 
                const o = { ...this.grid[r][c] }
                o.isOpen = Math.floor((Math.random() * 2)) === 1;
                this.grid[r][c] = o;
                o.id = uuidv4();
                if (this.grid[r][c].number === -1) {
                    this.fillSurrounding(r,c);
                }
            }
        }
    }

    private fillSurrounding = (bombR: number, bombC: number) => {
        for(let r = -1; r < 2; r+=1) {
            for(let c = -1; c < 2; c +=1 ) {
                const tR = bombR + r;
                const tC = bombC + c;
                if((tR >=0 && tC >=0) && (tR < this.rows && tC < this.columns) && (tC !== bombC || tR !==bombR) && this.grid[tR][tC].number !== -1) {
                    const o = { ...this.grid[tR][tC] }
                    o.number += 1;
                    this.grid[tR][tC] = o;
                }
            }
        }
    }

    isGridInstanceValid = () => {
        if (instance) return true;
        return false;
    }

    initializGrid = (rows: number, columns: number, totalBombs: number) => {
        
    }

    openCell = (rowIndex: number, colIndex: number, grid: Array<Array<{ number: number, isOpen: boolean, id: string }>>) => {
        if (rowIndex < this.rows && colIndex < this.columns) {
            if (grid[rowIndex][colIndex].number === 0) {
                this.openCell(rowIndex -1, colIndex-1, grid);
                this.openCell(rowIndex -1, colIndex, grid);
                this.openCell(rowIndex -1, colIndex+1, grid);
                this.openCell(rowIndex, colIndex-1, grid);
                this.openCell(rowIndex, colIndex+1, grid);
                this.openCell(rowIndex +1, colIndex-1, grid);
                this.openCell(rowIndex +1, colIndex, grid);
                this.openCell(rowIndex +1, colIndex+1, grid);
            }
            grid[rowIndex][colIndex].isOpen = true;
            return grid;
        }
        return grid
    }

    handleCellOpen = (rowIndex: number, colIndex: number) => {
        let currentGrid = [...this.grid];
        let clickCell = { ...currentGrid[rowIndex][colIndex]};
        console.log(clickCell);
        if (clickCell?.number === -1) {
            return {
                isSuccess: false,
                grid: currentGrid,
            }
        } else if (clickCell?.number !== 0) {
            clickCell.isOpen = true;
            currentGrid[rowIndex][colIndex] = clickCell
            return {
                isSuccess: true,
                grid: currentGrid,
            }
        } else {
            let temp = this.openCell(rowIndex, colIndex, currentGrid);
            return {
                isSuccess: true,
                grid: temp
            }
        }
        // this.openCell(rowIndex, colIndex, currentGrid);
    }

    getRows = () => {
        return this.rows;
    }
    getGrid = () => {
        return this.grid;
    }
}

export default Grid;