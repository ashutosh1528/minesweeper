import { v4 as uuidv4 } from 'uuid';
let instance:Grid;

class Grid {
    private grid:Array<Array<{ number: number, open: boolean, id: string }>> = [[]];
    private rows = 0;
    private columns = 0;
    private totalBombs = 0;
    constructor() {
        if (instance) return instance;
        // if (rows && columns && totalBombs) {
        //     if (totalBombs > rows * columns) {
        //         totalBombs = rows * columns;
        //     }
        //     this.rows = rows;
        //     this.columns = columns;
        //     this.totalBombs = totalBombs;
        //     const g = Array(rows).fill(0).map(() => Array(columns).fill({ number: 0, open: false, id: ''}));
        //     this.grid = g;
        //     this.fillbombs();
        //     this.fillDigits();
        //     instance = this;
        // }
        // return
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
                o.open = Math.floor((Math.random() * 2)) === 1;
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
        if (rows && columns && totalBombs) {
            if (totalBombs > rows * columns) {
                totalBombs = rows * columns;
            }
            this.rows = rows;
            this.columns = columns;
            this.totalBombs = totalBombs;
            const g = Array(rows).fill(0).map(() => Array(columns).fill({ number: 0, open: false, id: ''}));
            this.grid = g;
            this.fillbombs();
            this.fillDigits();
            instance = this;
            return this.grid;
        }
        return [];
    }

    getRows = () => {
        return this.rows;
    }
    getGrid = () => {
        return this.grid;
    }
}

export default Grid;