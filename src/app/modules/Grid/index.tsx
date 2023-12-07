'use client'
import Cell from './components/Cell';
import './styles/index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

const Grid = () => {
    const grid = useSelector((state: RootState) => state.grid.gridCells);

    return (
        <div className='grid__container'>
            {grid.map((rows, rowIndex) => {
                return (
                    <div className='grid__container__row' key={`${rowIndex}-key`}>
                        {rows.map((cell, colIndex) => <Cell rowIndex={rowIndex} colIndex={colIndex } key={`${cell.id}-key`} />)}
                    </div>
                )
            })}
        </div>
    )
}

export default Grid;