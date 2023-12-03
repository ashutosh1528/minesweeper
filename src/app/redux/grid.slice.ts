import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../redux/store'

type CounterState = {
    gridCells: Array<Array<{ id: string, number: number, open: boolean }>>
}
  

const initialState: CounterState = {
    gridCells: [[]] 
}

export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        setGrid: (state, action: PayloadAction<CounterState['gridCells']>) => {
            console.log(action.payload);
            // const currentState = state.gridCells || {};
            // let newGridCells: Record<string, { number: number, open: boolean, id: string }> = {};
            // action.payload?.forEach((row) => {
            //     row.forEach((cell) => {
            //         newGridCells[cell.id] = { number: cell.number, open: cell.open, id: cell.id };
            //     })
            // })
            state.gridCells = action.payload;
        }
    }
  })
  
  export const { setGrid } = gridSlice.actions  
  export default gridSlice.reducer
  
  