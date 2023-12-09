import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Cell = { id: string; number: number; isOpen: boolean; isFlagged: boolean };

type CellIndex = {
  rowIndex: number;
  colIndex: number;
};

type GridState = {
  gridCells: Array<Array<Cell>>;
  rows: number;
  columns: number;
  totalBombs: number;
  totalFlagged: number;
  gameStatus: {
    isStarted: boolean;
    isWin: boolean;
    isEnded: boolean;
  };
  totalOpened: number;
};

const initialState: GridState = {
  gridCells: [[]],
  rows: 0,
  columns: 0,
  totalBombs: 0,
  totalFlagged: 0,
  gameStatus: {
    isStarted: false,
    isWin: false,
    isEnded: false,
  },
  totalOpened: 0,
};

const fillbombs = (rows: number, columns: number, totalBombs: number, grid: GridState["gridCells"]) => {
  let temp = 0;
  while (temp !== totalBombs) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * columns);
    if (grid[x][y].number === 0) {
      const o = { ...grid[x][y] };
      o.number = -1;
      grid[x][y] = o;
      temp += 1;
    }
  }
};

const fillDigits = (rows: number, columns: number, grid: GridState["gridCells"]) => {
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < columns; c += 1) {
      const o = { ...grid[r][c] };
      o.id = uuidv4();
      if (grid[r][c].number === -1) {
        fillSurrounding(r, c, rows, columns, grid);
      }
    }
  }
};

const fillSurrounding = (bombR: number, bombC: number, rows: number, columns: number, grid: GridState["gridCells"]) => {
  for (let r = -1; r < 2; r += 1) {
    for (let c = -1; c < 2; c += 1) {
      const tR = bombR + r;
      const tC = bombC + c;
      if (
        tR >= 0 &&
        tC >= 0 &&
        tR < rows &&
        tC < columns &&
        (tC !== bombC || tR !== bombR) &&
        grid[tR][tC].number !== -1
      ) {
        const o = { ...grid[tR][tC] };
        o.number += 1;
        grid[tR][tC] = o;
      }
    }
  }
};

// Fucker function !!
const openCell = (
  rowIndex: number,
  colIndex: number,
  grid: GridState["gridCells"],
  rows: number,
  columns: number,
  opened: number
) => {
  const inGrid = rowIndex >= 0 && colIndex >= 0 && rowIndex < rows && colIndex < columns;
  const isFlagged = grid?.[rowIndex]?.[colIndex]?.isFlagged === true;
  const isOpen = grid?.[rowIndex]?.[colIndex]?.isOpen === true;
  if (!inGrid || isFlagged || isOpen) {
    return { grid, opened };
  }

  const isZero = grid[rowIndex][colIndex].number === 0;
  if (!isZero) {
    grid[rowIndex][colIndex].isOpen = true;
    opened += 1;
    return { grid, opened };
  }

  grid[rowIndex][colIndex].isOpen = true;
  opened += 1;
  for (let r = -1; r < 2; r += 1) {
    for (let c = -1; c < 2; c += 1) {
      const tR = rowIndex + r;
      const tC = colIndex + c;
      if (
        tR >= 0 &&
        tC >= 0 &&
        tR < rows &&
        tC < columns &&
        (tC !== colIndex || tR !== rowIndex) &&
        !grid[tR][tC].isOpen
      ) {
        const { opened: y } = openCell(tR, tC, grid, rows, columns, opened);
        opened = y;
      }
    }
  }
  return { grid, opened };
};

const openSurrounding = (
  rowIndex: number,
  colIndex: number,
  grid: GridState["gridCells"],
  rows: number,
  columns: number
) => {
  let openCount = 0;
  for (let r = -1; r < 2; r += 1) {
    for (let c = -1; c < 2; c += 1) {
      const tR = rowIndex + r;
      const tC = colIndex + c;
      if (tR >= 0 && tC >= 0 && tR < rows && tC < columns && (tC !== colIndex || tR !== rowIndex)) {
        const o = grid[tR][tC];
        // check for bomb !!
        if (!o.isOpen && !o.isFlagged && o.number !== -1) {
          // check for bomb !!
          if (o.number === 0) {
            const { opened: c } = openCell(tR, tC, grid, rows, columns, 0);
            openCount += c;
          } else {
            o.isOpen = true;
            openCount += 1;
          }
          grid[tR][tC] = o;
        }
      }
    }
  }
  return { grid, openCount: openCount };
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGrid: (state, action: PayloadAction<GridState["gridCells"]>) => {
      state.gridCells = action.payload;
    },
    setGridCell: (state, action: PayloadAction<{ rowIndex: number; colIndex: number; cell: Cell }>) => {
      console.log(action);
      state.gridCells[action.payload.rowIndex][action.payload.rowIndex] = action.payload.cell;
    },
    initializeGrid: (
      state,
      action: PayloadAction<{
        rows: number;
        columns: number;
        totalBombs: number;
      }>
    ) => {
      const { rows, columns } = action.payload;
      let totalBombs = action.payload.totalBombs;
      if (rows && columns && totalBombs) {
        if (totalBombs > rows * columns) {
          totalBombs = rows * columns;
        }
        state.rows = rows;
        state.columns = columns;
        state.totalBombs = totalBombs;
        const g = Array(rows)
          .fill(0)
          .map(() =>
            Array(columns).fill({
              number: 0,
              isOpen: false,
              id: "",
              isFlagged: false,
            })
          );
        fillbombs(rows, columns, totalBombs, g);
        fillDigits(rows, columns, g);
        state.gameStatus.isStarted = true;
        state.gridCells = g;
      }
    },
    handleCellOpen: (state, action: PayloadAction<CellIndex>) => {
      // check for bomb !
      const currentGrid = [...state.gridCells];
      const { rowIndex, colIndex } = action.payload;
      const clickCell = { ...currentGrid[rowIndex][colIndex] };
      if (clickCell.number === -1) {
        // state.isGameEnded = true;
      } else {
        if (clickCell?.number !== 0) {
          clickCell.isOpen = true;
          currentGrid[rowIndex][colIndex] = clickCell;
          state.gridCells = currentGrid;
          state.totalOpened += 1;
        } else {
          const temp = openCell(rowIndex, colIndex, currentGrid, state.rows, state.columns, state.totalOpened);
          state.totalOpened = temp.opened;
        }
      }
    },
    handleCellDoubleClick: (state, action: PayloadAction<CellIndex>) => {
      const { rowIndex, colIndex } = action.payload;
      const { grid: _grid, openCount } = openSurrounding(
        rowIndex,
        colIndex,
        [...state.gridCells],
        state.rows,
        state.columns
      );
      state.gridCells = _grid;
      state.totalOpened += openCount;
    },
    handleCellFlagging: (state, action: PayloadAction<CellIndex>) => {
      const currentGrid = [...state.gridCells];
      const { colIndex, rowIndex } = action.payload;
      currentGrid[rowIndex][colIndex].isFlagged = true;
      state.totalFlagged += 1;
      state.gridCells = currentGrid;
    },
    handleCellDeFlagging: (state, action: PayloadAction<CellIndex>) => {
      const currentGrid = [...state.gridCells];
      const { colIndex, rowIndex } = action.payload;
      state.totalFlagged -= 1;
      currentGrid[rowIndex][colIndex].isFlagged = false;
      state.gridCells = currentGrid;
    },
  },
});

export const {
  setGrid,
  setGridCell,
  initializeGrid,
  handleCellOpen,
  handleCellDoubleClick,
  handleCellFlagging,
  handleCellDeFlagging,
} = gridSlice.actions;
export default gridSlice.reducer;
